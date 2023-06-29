'use client';

import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';
import { createNewProject, fetchToken } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const router = useRouter();

  const handelOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);
        router.push('/');
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const [form, setForm] = useState({
    image: '',
    title: '',
    description: '',
    githubUrl: '',
    category: '',
    liveSiteUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelStateChange = (fieldName: string, value: string) => {
    setForm((pre) => ({ ...pre, [fieldName]: value }));
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files![0];

    if (!file) return;
    if (!file.type.includes('image')) {
      return alert('Please choose an image');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      handelStateChange('image', result);
    };
  };

  return (
    <form onSubmit={handelOnSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          name="image-uploader"
          id="image-uploader"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            alt="Project Poster"
            className="sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Yahibble"
        setState={(value) => handelStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value) => handelStateChange('description', value)}
      />

      <FormField
        type="url"
        title="Url"
        state={form.liveSiteUrl}
        placeholder="Website Url"
        setState={(value) => handelStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="Github Url"
        state={form.githubUrl}
        placeholder="https://github.com/MrEpic786/"
        setState={(value) => handelStateChange('githubUrl', value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handelStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Updating'}`
              : `${type === 'create' ? 'Create' : 'Update'} Project`
          }
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};
export default ProjectForm;
