import { useState, useCallback } from 'react'
import { addBookmark, removeBookmark, isBookmarked, getBookmarks } from '../lib/bookmarks'
import { useAuth } from '../context/AuthContext'
import { supabase, isSupabaseEnabled } from '../lib/supabase'

export function useBookmarks(type = null) {
  const { user } = useAuth()
  const [list, setList] = useState(() => getBookmarks(type))

  const refresh = useCallback(() => setList(getBookmarks(type)), [type])

  const bookmark = useCallback(async (item) => {
    const added = addBookmark(item)
    if (!added) return false
    refresh()
    if (isSupabaseEnabled && user) {
      await supabase.from('bookmarks').upsert({
        user_id: user.id, type: item.type, ref_id: item.refId,
        subject: item.subject || '', title: item.title || '', note: item.note || '',
        created_at: new Date().toISOString(),
      }, { onConflict: 'user_id,type,ref_id' }).catch(() => {})
    }
    return true
  }, [user, refresh])

  const unbookmark = useCallback(async (bType, refId) => {
    removeBookmark(bType, refId)
    refresh()
    if (isSupabaseEnabled && user) {
      await supabase.from('bookmarks').delete().match({ user_id: user.id, type: bType, ref_id: refId }).catch(() => {})
    }
  }, [user, refresh])

  const check = useCallback((bType, refId) => isBookmarked(bType, refId), [])

  return { list, bookmark, unbookmark, check, refresh }
}
