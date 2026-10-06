<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

<!-- LOVABLE:BEGIN (project rules) -->
- Routing: the lessons page is public at `/`; `/dashboard` gates itself with its own `beforeLoad` auth check. Do not reintroduce a `_authenticated` pathless layout route claiming `/` — it conflicts with `src/routes/index.tsx` and breaks the router.
- Quiz scores are saved by upserting `quiz_completions` with `onConflict: "user_id,lesson_id"` (unique index exists in the database).
- `lesson_stats()` returns columns `lesson_id, completions, avg_score`; only admins get rows (admin check inside the function).
<!-- LOVABLE:END -->
