import React from 'react';
type SelectedChapterType = {
  id: string;
  title: string;
  text: string;
};
interface ChapterStateProps {
  chapter: Maybe<SelectedChapterType>;
  setChapter: React.Dispatch<React.SetStateAction<Maybe<SelectedChapterType>>>;
  resetChapter: () => void;
}

// export const useAuthState = create<AuthStateProps>()(set => ({
//   auth: null,
//   setAuth: auth => set(() => ({ auth })),
// }));

export function useChapterState(): ChapterStateProps {
  const [chapter, setChapter] = React.useState<Maybe<SelectedChapterType>>();

  React.useEffect(() => console.log({ chapter }), [chapter]);
  const resetChapter = () => {
    setChapter(null);
  };
  return { chapter, setChapter, resetChapter };
}
