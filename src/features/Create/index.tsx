import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FiSave } from 'react-icons/fi';

import { Header } from '@/components/layout/header';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/layout/loading';

import { useCreateHook } from './hooks/create.hook';

const CreateScreen: React.FC = () => {
  const { form, loading, onSubmit } = useCreateHook();
  return (
    <div>
      <Header />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-10 py-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter title:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Once upon a time..."
                    {...field}
                    className="bg-transparent focus:border-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl className="text-white bg-transparent mx-2">
                  <CKEditor
                    editor={ClassicEditor}
                    data={field.value}
                    config={{
                      language: 'pt-br',
                      ui: {
                        poweredBy: {
                          label: 'Rod',
                          horizontalOffset: 0,
                          position: 'border',
                          side: 'right',
                          verticalOffset: 0,
                          forceVisible: true,
                        },
                      },
                    }}
                    onChange={(_event, editor) => {
                      const data = editor.getData();
                      form.setValue('text', data);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <Loading />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateScreen;
