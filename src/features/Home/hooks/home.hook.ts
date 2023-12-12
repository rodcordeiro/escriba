import { ChaptersTypes } from '@/@types/chapters';
import React from 'react';
import { ListChaptersRequest } from '../api/home.requests';
import { useToast } from '@/components/ui/use-toast';
import { retry } from '@/utils/retry.util';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@/stores/auth.store';
import { useChapterState } from '@/stores/chapter.store';

const DEFAULT_CHAPTER = {
  id: 'null',
  createdAt: '',
  updatedAt: '',
  title: 'Escriba',
  text: '<h3 className="py-2 px-5">O que é o Escriba?</h3>  <p className="indent-2">    O Escriba é um site desenvolvido por Rodrigo Cordeiro com o intuito de    auxiliar no desenvolvimento de livros, servindo como ferramenta de    escrita e permitindo seu acesso de qualquer dispositivo.  </p>',
};

export function useHomeHook() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedChapter, setSelectedChapter] =
    React.useState<ChaptersTypes.Chapter>(DEFAULT_CHAPTER);
  const [chapters, setChapters] = React.useState<ChaptersTypes.Chapter[]>();
  const [open, setOpen] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetAuth } = useAuthState();

  function handleChapterText(chapter: ChaptersTypes.Chapter) {
    const chapterElement = document.getElementById('content');
    if (chapterElement) chapterElement.innerHTML = chapter.text;
  }

  React.useEffect(() => {
    handleChapterText(selectedChapter);
  }, [selectedChapter]);

  React.useLayoutEffect(() => {
    retry(async () => {
      setLoading(true);
      await ListChaptersRequest()
        .then(({ data }) => {
          toast({
            description: 'Here are your posts!!',
          });
          setChapters(data);
        })
        .catch((err: AxiosError) => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: err.message,
          });
          if (err.response?.status === 401)
            setTimeout(() => {
              resetAuth();
              navigate('/login');
            }, 2500);
          console.error(err);
        })
        .finally(() => setLoading(false));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    selectedChapter,
    setSelectedChapter,
    chapters,
    loading,
    open,
    setOpen,
  };
}
