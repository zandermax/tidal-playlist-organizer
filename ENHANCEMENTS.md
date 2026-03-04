# Enhancements

Future feature ideas — tackle these once the core TODO list is complete.

---

## Use robust local storage

**Note:** do this before the others

Explore using indexedDb for actual storage because a lot of playlist data can be stored at once. This may also be app storage if this is used as a native app.

## Native folder management via Tidal API

The Tidal v2 API has full `UserCollectionFolders` CRUD (`GET`, `POST`, `PATCH`, `DELETE`, add/remove items), already typed in `@tidal-music/api`'s generated types. This means folders can be managed natively through the API rather than being inferred from the sidebar — creating, renaming, and deleting folders without any encoding tricks.

## Nested folders via name encoding

For nesting deeper than Tidal's native one level, encode folder path in the playlist name using the same bracket-token convention used for tags:

```text
My Playlist [folder:Work Music/Deep Focus]
```

- Parse `folder:` tokens the same way tag tokens are parsed
- Build a folder tree from the path segments at fetch time
- Writing a folder assignment = renaming the playlist via the Tidal API
- Display name still strips all tokens

This pairs naturally with the tag encoding from Step 1.5 and requires no additional backend.

---

## Tag color persistence

Currently tag colors are defined by the app with defaults. If a user renames a tag or the default colors change, the color assignment resets. Options:

- Encode color in the token itself: `[workout:blue]`
  - Could also be a color code in something like hex values
- Or store a lightweight color map in `localStorage` as a best-effort cache (acceptable to lose)

---

## Export / import organization data

Allow users to export their tag assignments as a JSON file and re-import on another device or browser, as a manual sync fallback before any real backend exists.

---

## Undo for bulk tag operations

Bulk-tagging many playlists at once (Step 6) triggers a rename API call for each. An undo action that reverses those renames within a short window would reduce the cost of mistakes.

---

## Tidal API rename support check at startup

Gracefully detect at load time whether the Tidal SDK supports playlist renames (needed for tag writes). If not, show tags as read-only and surface a clear explanation rather than silently failing.

---

## "Draft" sessions

Allow users to edit their playlists but don't save anything to Tidal until they hit a save button. Store all changes locally until syncing. So for example, many playlists can be modified at the same time and worked until they are in a state that the user wants.
