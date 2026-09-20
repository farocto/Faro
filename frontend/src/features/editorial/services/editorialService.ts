import { editorialPosts, editorialTags, thisWeekEvents, tonightItems } from '@/features/editorial/data/editorialMockData';
import type { EditorialPost, EditorialTag, DiscoveryEvent, TonightItem } from '@/features/editorial/types/editorial';

export interface EditorialFeedData {
  posts: EditorialPost[];
  tags: EditorialTag[];
  thisWeek: DiscoveryEvent[];
  tonight: TonightItem[];
}

export function getEditorialFeed(): EditorialFeedData {
  return {
    posts: editorialPosts,
    tags: editorialTags,
    thisWeek: thisWeekEvents,
    tonight: tonightItems,
  };
}
