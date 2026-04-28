import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = [
  { id: 'siteSettings', title: 'Site Settings', icon: '⚙️' },
  { id: 'navbar', title: 'Navbar', icon: '🧭' },
  { id: 'hero', title: 'Hero Section', icon: '🎯' },
  { id: 'valueProps', title: 'Value Props', icon: '💎' },
  { id: 'whyChooseUs', title: 'Why Choose Us', icon: '🏆' },
  { id: 'featuredContent', title: 'Featured Content', icon: '✨' },
  { id: 'faq', title: 'FAQ', icon: '❓' },
  { id: 'leadCapture', title: 'Lead Capture Form', icon: '📨' },
  { id: 'footer', title: 'Footer', icon: '📋' },
  { id: 'thankYouPage', title: 'Thank You Page', icon: '🎉' },
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Landing Page Sections')
        .child(
          S.list()
            .title('Sections')
            .items(
              SINGLETONS.map((s) =>
                S.listItem()
                  .title(`${s.icon} ${s.title}`)
                  .id(s.id)
                  .child(
                    S.editor()
                      .id(s.id)
                      .schemaType(s.id)
                      .documentId(s.id),
                  ),
              ),
            ),
        ),
      S.divider(),
      S.documentTypeListItem('legalPage').title('📄 Legal Pages'),
      S.documentTypeListItem('restaurant').title('🍴 Restaurants'),
      S.documentTypeListItem('blogPost').title('✍️ Blog Posts'),
    ]);
