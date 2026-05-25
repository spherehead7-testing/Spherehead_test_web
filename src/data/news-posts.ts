export const newsCategories = [
  "Tech and Development",
  "Innovation",
  "Design",
  "Tech Stacks",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsPost = {
  slug: string;
  title: string;
  category: NewsCategory;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  body: string[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: "building-scalable-product-platforms",
    title: "Building Scalable Product Platforms Without Slowing Teams Down",
    category: "Tech and Development",
    excerpt:
      "How modular architecture, clear ownership, and practical automation help product teams ship faster without creating brittle systems.",
    date: "Apr 18, 2026",
    readTime: "6 min read",
    image: "/images/landingPage/serviceSec1.svg",
    featured: true,
    body: [
      "Scalable platforms are not built by adding complexity early. They are built by protecting simple boundaries, making ownership clear, and allowing teams to improve the system while still shipping useful product work.",
      "The strongest teams document the contracts between services, keep deployment paths boring, and automate the checks that catch regressions before they reach customers.",
      "A platform becomes valuable when it removes repeated decisions. It should make the right path easy, visible, and fast enough that teams want to use it.",
    ],
  },
  {
    slug: "innovation-through-operational-clarity",
    title: "Innovation Starts With Operational Clarity",
    category: "Innovation",
    excerpt:
      "A practical look at how businesses can turn scattered digital ideas into a focused roadmap with measurable outcomes.",
    date: "Apr 12, 2026",
    readTime: "5 min read",
    image: "/images/landingPage/industry3.svg",
    featured: true,
    body: [
      "Innovation works best when it is attached to a business constraint. Teams need to know which friction they are removing, which customer moment they are improving, and how success will be measured.",
      "A focused roadmap gives creative work a useful frame. It helps leaders compare opportunities and decide which experiments deserve engineering time.",
      "The goal is not to chase every new technology. The goal is to create repeatable ways to test, learn, and scale the ideas that create durable value.",
    ],
  },
  {
    slug: "design-systems-for-digital-products",
    title: "Design Systems That Make Digital Products Easier To Evolve",
    category: "Design",
    excerpt:
      "Why a useful design system is less about a component library and more about consistent product decisions.",
    date: "Apr 06, 2026",
    readTime: "4 min read",
    image: "/images/landingPage/serviceSec3.svg",
    featured: true,
    body: [
      "A design system should help teams move with confidence. That means shared spacing, type, interaction states, and accessibility decisions that are easy to apply in daily product work.",
      "The most useful systems are shaped by real screens, not abstract inventories. Components should earn their place by solving repeated product problems.",
      "When design and engineering maintain the system together, it becomes a living product asset instead of a static reference file.",
    ],
  },
  {
    slug: "choosing-a-modern-web-stack",
    title: "Choosing a Modern Web Stack for Long-Term Growth",
    category: "Tech Stacks",
    excerpt:
      "A senior engineer's checklist for selecting frameworks, hosting, data tools, and integration patterns that will age well.",
    date: "Mar 28, 2026",
    readTime: "7 min read",
    image: "/images/landingPage/serviceSec4.svg",
    body: [
      "A strong web stack should match the product's operating reality. Traffic patterns, content needs, team experience, release cadence, and integration complexity all matter more than trend value.",
      "Choose tools that make common work straightforward and uncommon work possible. The best stack gives teams enough structure without forcing every feature through the same shape.",
      "Long-term growth depends on observability, dependency discipline, and a clear upgrade path as much as it depends on the framework itself.",
    ],
  },
  {
    slug: "ai-assisted-development-workflows",
    title: "AI-Assisted Development Workflows That Actually Help",
    category: "Tech and Development",
    excerpt:
      "Where AI tools fit into software delivery, from discovery and scaffolding to review, refactoring, and test coverage.",
    date: "Mar 20, 2026",
    readTime: "6 min read",
    image: "/images/landingPage/serviceSec2.svg",
    body: [
      "AI-assisted workflows work best when they are paired with clear engineering standards. The tool can accelerate exploration, but the team still owns architecture, review, and product judgment.",
      "Useful adoption starts with bounded tasks: generating test cases, explaining unfamiliar code, drafting migrations, and checking edge cases.",
      "Teams get the most value when AI becomes part of an existing review culture instead of replacing the thinking that keeps software reliable.",
    ],
  },
  {
    slug: "service-design-for-business-platforms",
    title: "Service Design for Business Platforms",
    category: "Design",
    excerpt:
      "How thoughtful journeys, states, and feedback loops make operational software easier for teams to trust and repeat.",
    date: "Mar 14, 2026",
    readTime: "5 min read",
    image: "/images/landingPage/industry2.svg",
    body: [
      "Operational platforms need design that respects repetition. Users should be able to scan, compare, correct, and continue without losing context.",
      "Good service design maps the full journey around the screen: handoffs, approvals, exceptions, notifications, and recovery paths.",
      "The interface feels better when the underlying process is clearer. Design and operations need to evolve together.",
    ],
  },
  {
    slug: "cloud-native-foundations",
    title: "Cloud-Native Foundations for Reliable Digital Products",
    category: "Tech Stacks",
    excerpt:
      "The infrastructure decisions that keep teams flexible while improving performance, release confidence, and resilience.",
    date: "Mar 05, 2026",
    readTime: "8 min read",
    image: "/images/landingPage/industry4.svg",
    body: [
      "Cloud-native foundations are strongest when they are understandable. Teams should know where code runs, how it is deployed, how failures appear, and how to recover quickly.",
      "Reliability comes from a chain of small decisions: health checks, logs, metrics, rollbacks, secrets management, and sensible environments.",
      "The goal is not to over-engineer. The goal is to make production behavior visible enough that teams can improve it deliberately.",
    ],
  },
  {
    slug: "turning-ideas-into-digital-products",
    title: "Turning Ideas Into Digital Products With Less Waste",
    category: "Innovation",
    excerpt:
      "A practical discovery model for moving from insight to prototype to production with better feedback at each stage.",
    date: "Feb 26, 2026",
    readTime: "5 min read",
    image: "/images/landingPage/industry5.svg",
    body: [
      "The fastest path from idea to product is rarely a straight build. It starts by identifying the riskiest assumption and designing the smallest useful way to test it.",
      "Discovery should produce decisions, not just documents. Each prototype, interview, or technical spike should reduce uncertainty.",
      "When teams learn early, they protect budget and focus engineering effort on the work most likely to matter.",
    ],
  },
];

export const featuredNewsPosts = newsPosts.filter((post) => post.featured);
