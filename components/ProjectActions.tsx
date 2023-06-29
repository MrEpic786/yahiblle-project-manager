'use client';

import { deleteUserProject, fetchToken } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const handelDeleteProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();

    try {
      await deleteUserProject(projectId, token);
      router.push('/');
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>
      <button
        type="button"
        className={`flexCenter delete-action_btn bg-gray ${
          isDeleting ? 'bg-gray' : 'bg-primary-purple'
        }`}
        onClick={handelDeleteProject}
      >
        <Image src="/trash.svg" width={15} height={15} alt="trash" />
      </button>
    </>
  );
};
export default ProjectActions;
