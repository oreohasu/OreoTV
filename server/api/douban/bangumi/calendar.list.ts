interface BangumiCalendar {
  weekday: BangumiCalendarWeekday
  items: BangumiCalendarItem[]
}

interface BangumiCalendarWeekday {
  id: number
  en: string
  cn: string
  ja: string
}

interface BangumiCalendarItem {
  id: number
  name: string
  name_cn: string
  air_date: string
  air_weekday: number
  url?: string
  rating?: {
    score: string
  }
  images: {
    large: string
    common: string
    medium: string
  }
}

export default defineEventHandler(async (_) => {
  try {
    return await $fetch<BangumiCalendar[]>('https://api.bgm.tv/calendar')
  }
  catch (err) {
    console.error('bangumi api error: ', err)
    return []
  }
})
