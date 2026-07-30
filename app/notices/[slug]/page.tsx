import type { Metadata } from 'next';
import { notices } from '@/content/notices';
import NoticePageContent, { generateStaticParams } from './notice-page';

export { generateStaticParams };

type NoticePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: NoticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const notice = notices.find((entry) => entry.slug === slug);
  return notice ? { title: notice.title.en, description: notice.summary.en } : { title: 'Notice not found' };
}

export default async function NoticePage({ params }: NoticePageProps) {
  return <NoticePageContent params={await params} />;
}
