# Wire Up Mocked Features

Auth is real. Playlist fetching and display are real. Everything else is either disconnected, hardcoded, or an `alert()` stub.

**How to use this list:** Work through each step yourself, then paste your changes and say "check step N" and the agent will review your work before you proceed.

## Progress

- [x] Step 1 – Wire up TopBar search
- [ ] Step 1.5 – Encode tags/folders in playlist names
- [ ] Step 2 – Connect FilterPanel options to organization store
- [ ] Step 3 – Add tag/folder filtering logic
- [ ] Step 4 – Connect Sidebar folder selection to playlist view
- [ ] Step 5 – Show real tags on playlist cards
- [ ] Step 6 – Implement bulk Add-to-Folder and Add-Tags
- [ ] Step 7 – PlaylistCard context menu actions

---

## Svelte 5 Cheat Sheet (React comparison)

| React                             | Svelte 5                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `useState(x)`                     | `let x = $state(x)`                                                                                |
| `useMemo(() => expr)`             | `let y = $derived(expr)`                                                                           |
| `useEffect(() => { ... }, [dep])` | `$effect(() => { dep; ... })`                                                                      |
| Component props                   | `let { foo, onFoo } = $props()`                                                                    |
| `useContext` / prop drilling      | Import a store directly; read it as `$storeName` in templates, or `$derived($storeName)` in script |
| Event handlers `onChange={fn}`    | `oninput={fn}` (all lowercase in Svelte 5)                                                         |

The stores in this project use the older Svelte 4 `writable()` pattern. To read one reactively in a Svelte 5 `<script>`, use `$derived($storeName)` — the `$` prefix auto-subscribes.

---

## Step 1 – Wire up TopBar search

**Goal:** Typing in the search bar filters playlists.

**Files to edit:**

- `src/lib/components/layout/TopBar.svelte`
- `src/lib/components/PlaylistsView.svelte`

**What's already there:**

- `TopBar` has a bare `<input type="search">` with no binding and no handler
- `PlaylistsView` has `handleSearch(query: string)` and `searchQuery` state, but never passes `handleSearch` to `TopBar`

**Your tasks:**

- [ ] In `TopBar`, declare an `onsearch` prop using `$props()` that accepts a `(query: string) => void` callback
- [ ] Add a local `value` state for the input and bind it with `bind:value`
- [ ] Call `onsearch(value)` on the input's `oninput` event
- [ ] In `PlaylistsView`, pass `onsearch={handleSearch}` to the `<TopBar>` component

**Checkpoint:** Paste your updated `TopBar.svelte` and the relevant `PlaylistsView` template line. Ask the agent to "check step 1".

---

## Step 1.5 – Encode tags (and folders) in playlist names

**Goal:** Store organization metadata inside the Tidal playlist name itself, so tags and folders are device-agnostic and survive localStorage clears — no backend required.

**Convention:**

Tokens are appended to the **end** of the playlist name:

```
My Playlist [workout][chill]
```

- Tag token: `[tagname]` (lowercase, no spaces — use hyphens if needed)
- Multiple tokens are fine; order doesn't matter
- Tokens go at the end so Tidal's own UI (which truncates long names) still shows the human-readable playlist name first
- The display name shown in this app strips all tokens: `My Playlist`

**Architectural impact:**

- Tags are no longer written to or read from `localStorage`
- The `organization` store's tag list becomes a **derived/parsed view** of the fetched playlist names, not a separate persistent store
- The `playlistIds` arrays on `Tag` are redundant — membership is intrinsic to the name
- Adding/removing a tag = **renaming the playlist** via the Tidal API (see Step 7 for the rename capability)
- Folders are left alone — Tidal supports them natively at one level deep, so no encoding needed

**Files to edit:**

- `src/lib/stores/organization.ts`
- Any playlist-fetching code that builds the playlist list

**Your tasks:**

- [ ] Write a `parsePlaylistName(raw: string): { displayName: string; tags: string[] }` utility that extracts bracket tokens and returns the clean display name
- [ ] After fetching playlists, run each name through `parsePlaylistName` and use the results to populate the organization store's tag list (derive `Tag[]` from the union of all parsed tags across all playlists)
- [ ] Use `displayName` everywhere the playlist name is rendered instead of the raw name

**Hint:** A regex like `/\[([^\]]+)\]/g` will capture all bracket tokens.

**Checkpoint:** Paste your `parsePlaylistName` function and describe how you're populating the store from it. Ask the agent to "check step 1.5".

---

## Step 2 – Connect FilterPanel tag/folder options to the organization store

**Goal:** The tag and folder options in the filter panel come from the real store instead of hardcoded strings.

**Files to edit:**

- `src/lib/components/toolbar/FilterPanel.svelte`

**What's already there:**

- FilterPanel renders hardcoded tag names (`'Workout'`, `'Chill'`, `'Party'`) and folder names (`'Work Music'`, `'Favorites'`) — search for them in the template
- The `organization` store in `src/lib/stores/organization.ts` has `tags: Tag[]` and `folders: Folder[]` with real `id` and `name` fields

**Your tasks:**

- [ ] Import `organization` from `$lib/stores/organization`
- [ ] Use `$derived($organization)` to get a reactive snapshot of the store
- [ ] Replace the hardcoded tag options with the store's `tags` array, iterating with `{#each}`
- [ ] Do the same for folders

**Hint:** The `toggleTag` and `toggleFolder` functions in FilterPanel currently use the tag/folder name as the key. The store uses `id`. You'll need to decide which to keep consistent — `id` is the better choice. You may need to update `toggleTag`/`toggleFolder` and the `{#each}` bindings accordingly.

**Checkpoint:** Paste your updated FilterPanel script block and the tag/folder sections of the template. Ask the agent to "check step 2".

---

## Step 3 – Add tag and folder filtering logic

**Goal:** Selecting tags or folders in the filter panel actually filters the playlist list.

**Files to edit:**

- `src/lib/components/PlaylistsView.svelte`

**What's already there:**

- `filterAndSortPlaylists` handles date, track count, search, and sort — but skips `activeFilters.tags` and `activeFilters.folders` entirely
- The organization store has `getPlaylistsByTag(tagId, state)` and `getPlaylistsByFolder(folderId, state)` that return `string[]` of playlist IDs

**Your tasks:**

- [ ] Import `organization` in `PlaylistsView` and derive a snapshot with `$derived($organization)`
- [ ] In `filterAndSortPlaylists`, after the existing filters, add a block that: if `activeFilters.tags` is non-empty, keeps only playlists whose `id` appears in the union of `getPlaylistsByTag()` results for each selected tag
- [ ] Add the same logic for `activeFilters.folders`

**Checkpoint:** Paste your updated `filterAndSortPlaylists` function. Ask the agent to "check step 3".

---

## Step 4 – Connect Sidebar folder selection to the playlist view

**Goal:** Clicking a folder in the sidebar filters playlists to that folder.

**Files to edit:**

- `src/routes/+page.svelte`
- `src/lib/components/layout/Sidebar.svelte`
- `src/lib/components/PlaylistsView.svelte`

**What's already there:**

- Sidebar has a `selectedFolderId` internal state that goes nowhere
- `+page.svelte` is the common parent of both Sidebar and PlaylistsView

**Your tasks:**

- [ ] In `+page.svelte`, declare `let selectedFolderId = $state<string | null>(null)`
- [ ] Pass it to `<Sidebar>` as a prop and wire up an `onFolderSelect` callback to update it
- [ ] Pass `selectedFolderId` to `<PlaylistsView>` as a prop
- [ ] In `PlaylistsView`, accept the new prop and use it in `filterAndSortPlaylists` to filter by folder (reuse what you built in Step 3)

**Hint:** This is the classic React "lift state up" pattern. It works exactly the same way in Svelte — the parent owns the state, children receive it as props and emit events via callbacks.

**Checkpoint:** Paste your changes to `+page.svelte`, the Sidebar prop interface, and the PlaylistsView prop/filter additions. Ask the agent to "check step 4".

---

## Step 5 – Show real tags on playlist cards

**Goal:** Tags assigned to a playlist in the organization store appear as chips on each card.

**Files to edit:**

- `src/lib/components/playlist/PlaylistGrid.svelte`

**What's already there:**

- `PlaylistGrid` has `let mockTags: Record<string, string[]> = {}` (line 33–34) — a comment says it will be replaced
- `organization.getTagsForPlaylist(playlistId, state)` returns `Tag[]` for a given playlist
- `PlaylistCard` already accepts and renders a `tags` prop

**Your tasks:**

- [ ] Import `organization` and derive the store state
- [ ] Replace `mockTags` with a `$derived` that builds the same `Record<string, Tag[]>` shape but sourced from `getTagsForPlaylist` for each playlist

**Checkpoint:** Paste your updated PlaylistGrid script block. Ask the agent to "check step 5".

---

## Step 6 – Implement bulk Add-to-Folder and Add-Tags

**Goal:** The bulk action bar's "Add to folder" and "Add tags" buttons actually work.

**Files to edit:**

- `src/lib/components/PlaylistsView.svelte`

**What's already there:**

- `handleBulkAddToFolder` and `handleBulkAddTags` are `alert()` stubs (lines 173–183)
- The organization store has `addPlaylistToFolder(folderId, playlistId)` and `addPlaylistToTag(tagId, playlistId)`
- `selectedIds` is a `Set<string>` of currently selected playlist IDs

**Your tasks:**

- [ ] Replace the `alert` stubs with real selection UI — the simplest approach is a native `<select>` inside a `<dialog>` element (no extra dependencies needed)
- [ ] On confirm, iterate `selectedIds` and call the appropriate store method for each

**Hint:** The HTML `<dialog>` element is well-supported and avoids building a custom modal from scratch. You can open it imperatively with `dialogElement.showModal()` or declaratively with a boolean `$state` variable.

**Checkpoint:** Paste your dialog markup and the updated handler functions. Ask the agent to "check step 6".

---

## Step 7 – PlaylistCard context menu actions

**Goal:** The Edit, Add to folder, and Share buttons on each card do something.

**Files to edit:**

- `src/lib/components/PlaylistCard.svelte`

**What's already there:**

- Three buttons exist with only `e.stopPropagation()` — no callbacks, no store calls

**Your tasks:**

- [ ] **Add to folder:** Reuse the dialog pattern from Step 6. Wire an `onAddToFolder` callback prop, or handle it inline.
- [ ] **Share:** Tidal's web URLs follow the pattern `https://tidal.com/browse/playlist/{id}`. Construct this from the playlist's `id` and copy it to clipboard using `navigator.clipboard.writeText()`.
- [ ] **Edit (rename):** This would require a Tidal API `PATCH` call. Check if the SDK supports it — if not, consider making rename local-only (store the override name in `localStorage`), or simply disable the button for now.

**Checkpoint:** Paste your PlaylistCard changes and describe how you handled the Edit case. Ask the agent to "check step 7".
