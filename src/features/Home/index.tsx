import { FiMenu, FiPlusCircle, FiEdit2 } from 'react-icons/fi';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Loading } from '@/components/layout/loading';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { useHomeHook } from './hooks/home.hook';
import './styles.css';
import { Header } from '@/components/layout/header';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const { selectedChapter, setSelectedChapter, chapters, open, setOpen } =
    useHomeHook();
  const navigate = useNavigate();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Header
        rightComponent={() => (
          <>
            <SheetTrigger className=" relative visible md:invisible top-2">
              <FiMenu />
            </SheetTrigger>

            <div>
              <FiPlusCircle
                className="relative invisible md:visible -top-3"
                onClick={() => navigate('/post')}
              />
            </div>
          </>
        )}
      />

      <div className="flex flex-row">
        <ScrollArea className="container basis-1/4 hidden md:block my-5 ">
          <SheetContent className="bg-gray-900">
            <SheetHeader>
              <SheetTitle className="text-white">
                Escolha um capítulo para visualizar
              </SheetTitle>
              {chapters?.map(chapter => (
                <div
                  className="container px-10 py-5 bg-violet-800 my-2 rounded-md"
                  onClick={() => {
                    setSelectedChapter(chapter);
                    setOpen(false);
                  }}
                >
                  <h3>{chapter.title}</h3>
                </div>
              ))}
            </SheetHeader>
          </SheetContent>
          {chapters?.map(chapter => (
            <div
              className="container px-10 py-5 bg-slate-500 my-2 rounded-md"
              onClick={() => setSelectedChapter(chapter)}
            >
              <h3>{chapter.title}</h3>
            </div>
          ))}
        </ScrollArea>
        <div id="post-container" className="container my-10">
          <div className="flex flex-row items-center pb-5">
            {selectedChapter.id !== 'null' && (
              <FiEdit2
                className=""
                onClick={() => navigate(`/post/${selectedChapter.id}`)}
              />
            )}
            <h1 className="text-2xl pl-10 ">{selectedChapter.title}</h1>
          </div>
          <div id="content"></div>
        </div>
      </div>
    </Sheet>
  );
};

export default HomeScreen;
