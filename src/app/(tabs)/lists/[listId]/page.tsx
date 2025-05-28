import List from './list';

export default async function ListPage({ params }: { params: Promise<{ listId: string }> }) {
  const { listId } = await params;

  return <List id={parseInt(listId)} />;
}
