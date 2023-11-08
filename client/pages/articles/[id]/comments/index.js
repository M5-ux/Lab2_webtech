import { useRouter } from 'next/router';

const CommentPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Comments for Post {id}</h1>
    </div>
  );
};

export default CommentPage;
