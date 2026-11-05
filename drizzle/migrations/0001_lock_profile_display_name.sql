-- Student display names are set once at registration (quiz scores, transcripts and
-- certificates all use them) and must never change afterwards. Removing the UPDATE
-- policy makes the column immutable even through the Data API.
DROP POLICY "Users update own profile" ON public.profiles;

COMMENT ON TABLE public.profiles IS 'Display names set at registration; intentionally immutable by students (no UPDATE policy). Names appear on transcripts and certificates.';