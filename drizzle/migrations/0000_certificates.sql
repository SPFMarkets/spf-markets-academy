CREATE TABLE public.certificates (
  cert_number text PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  graduate_name text NOT NULL CHECK (char_length(graduate_name) BETWEEN 1 AND 120),
  issued_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own certificate" ON public.certificates FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.issue_certificate(_name text)
RETURNS TABLE(cert_number text, graduate_name text, issued_at timestamptz)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); clean text := btrim(_name);
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'Not signed in'; END IF;
  IF clean IS NULL OR char_length(clean) < 1 OR char_length(clean) > 120 THEN RAISE EXCEPTION 'Invalid name'; END IF;
  IF NOT EXISTS (SELECT 1 FROM quiz_completions q WHERE q.user_id = uid AND q.lesson_id = 'final-capstone-exam')
     OR (SELECT count(*) FROM quiz_completions q WHERE q.user_id = uid) < 50 THEN
    RAISE EXCEPTION 'Curriculum not completed';
  END IF;
  INSERT INTO certificates AS c (cert_number, user_id, graduate_name)
  VALUES ('SPF-' || upper(substr(md5(uid::text), 1, 8)), uid, clean)
  ON CONFLICT (user_id) DO UPDATE SET graduate_name = EXCLUDED.graduate_name;
  RETURN QUERY SELECT c.cert_number, c.graduate_name, c.issued_at FROM certificates c WHERE c.user_id = uid;
END $$;
REVOKE ALL ON FUNCTION public.issue_certificate(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.issue_certificate(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.verify_certificate(_cert text)
RETURNS TABLE(cert_number text, graduate_name text, issued_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT c.cert_number, c.graduate_name, c.issued_at FROM certificates c
  WHERE c.cert_number = upper(btrim(_cert));
$$;
REVOKE ALL ON FUNCTION public.verify_certificate(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_certificate(text) TO anon, authenticated;