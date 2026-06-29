export const TAB_BAR_HEIGHT = 84;
export const TAB_BAR_MIN_BOTTOM = 18;
export const TAB_BAR_EXTRA_BOTTOM = 12;

export const SCREEN_CONTENT_TOP = 18;
export const SCREEN_CONTENT_BOTTOM_EXTRA = 14;

export const getTabBarBottom = (insetsBottom: number) => {
  return Math.max(TAB_BAR_MIN_BOTTOM, insetsBottom + TAB_BAR_EXTRA_BOTTOM);
};

export const getContentBottomPadding = (insetsBottom: number) => {
  return (
    getTabBarBottom(insetsBottom) + TAB_BAR_HEIGHT + SCREEN_CONTENT_BOTTOM_EXTRA
  );
};
