
export const profile = {
  name: "Aritra Das Sharma",
  role: "Graphic Designer & Multimedia Faculty",
  location: "Kolkata, India",
  phone: "+91 90383 97432",
  email: "aritradassharma16@gmail.com",
  photo: "/images/profile/aritra-profile.png",
  resumeUrl: "/resume.pdf",
  resumeVisible: true,
  introduction:
    "Hi, my name is Aritra Das Sharma, a graphic designer based in Kolkata, India with a passion for art, drawing, and visual communication, dedicated to crafting designs that captivate and communicate effectively. Currently working as Multimedia Faculty at NIELIT Kolkata, I combine hands-on creative execution with structured design mentorship. My core expertise spans print and digital design—including social media campaigns, web banners, posters, brochures, catalogues, packaging, and T-shirt graphics—alongside brand identity creation, image retouching, typography, colour theory, and layout principles."
};

export const skills = [
  { id: "adobe-photoshop", name: "Adobe Photoshop", group: "Design Software", percentage: 90, hidden: false, is_deleted: false },
  { id: "adobe-illustrator", name: "Adobe Illustrator", group: "Design Software", percentage: 90, hidden: false, is_deleted: false },
  { id: "adobe-indesign", name: "Adobe InDesign", group: "Design Software", percentage: 90, hidden: false, is_deleted: false },
  { id: "canva", name: "Canva", group: "Design Software", percentage: 90, hidden: false, is_deleted: false },
  { id: "adobe-premiere-pro", name: "Adobe Premiere Pro", group: "Video & Motion", percentage: 90, hidden: false, is_deleted: false },
  { id: "adobe-after-effects", name: "Adobe After Effects", group: "Video & Motion", percentage: 90, hidden: false, is_deleted: false },
  { id: "print-digital-design", name: "Print & Digital Design", group: "Design Skills", percentage: 90, hidden: false, is_deleted: false },
  { id: "brand-identity-logo", name: "Brand Identity (LOGO)", group: "Design Skills", percentage: 90, hidden: false, is_deleted: false },
  { id: "image-editing-retouching", name: "Image Editing & Retouching", group: "Design Skills", percentage: 90, hidden: false, is_deleted: false },
  { id: "typography-colour-layout", name: "Typography, Color Theory & Layout", group: "Design Skills", percentage: 90, hidden: false, is_deleted: false }
];

export const projects = [
  {
    id: "book-cover",
    slug: "book-cover-design",
    title: "Book Cover Design",
    category: "Book Cover",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/book-cover-front-cover.png",
    software: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign"],
    summary: "Editorial book jacket designs and 3D presentation mockups for Tintorettor Jishu and The Royal Bengal Mystery.",
    description:
      "This editorial book cover design collection showcases complete print-ready jackets and three-dimensional presentation mockups created for classic Bengali and English detective literature. The featured works include Satyajit Ray's Tintorettor Jishu and Mohanlal Banerjee's adaptation of The Royal Bengal Mystery. Each cover balances dramatic visual storytelling with high-impact display typography, custom spine alignment, and structured back-cover blurb panels. Bold crimson, deep charcoal, and vibrant wildlife photography are deployed to capture genre suspense at a single glance. Every layout demonstrates strict attention to print bleed margins, barcode integration, and visual continuity across front, spine, and back surfaces. Together, these pieces highlight a disciplined command of editorial hierarchy and commercial book packaging.",
    gallery: [
      {
        title: "Tintorettor Jishu — Full Jacket Spread",
        image: "/images/projects/book-cover-back-cover.png",
        alt: "Full front, spine and back cover layout for Satyajit Ray's Tintorettor Jishu",
        description:
          "This full-spread print jacket design presents the front cover, spine, and back synopsis panel for Satyajit Ray's Feluda mystery Tintorettor Jishu. A bold crimson backdrop patterned with subtle detective and artistic motifs unifies the entire wrap-around composition. High-contrast black-and-white character illustrations of Feluda, Topshe, and Lalmohan Babu anchor the front panel beneath expressive Bengali brush lettering. The central spine aligns vertical title typography and publisher insignia cleanly for shelf visibility. On the back panel, crisp Bengali body copy sits above a properly proportioned ISBN barcode block for commercial print readiness."
      },
      {
        title: "Tintorettor Jishu — 3D Book Mockup",
        image: "/images/projects/book-cover-mockup.png",
        alt: "Three-dimensional hardcover presentation mockup of Tintorettor Jishu",
        description:
          "This three-dimensional presentation mockup visualizes the Tintorettor Jishu jacket wrapped around a physical hardcover edition resting on an architectural ledge. Viewing the book at an isometric angle reveals how the crimson background and white spine lettering transition seamlessly from the front cover to the back panel. Realistic lighting, crisp page edges, and natural drop shadows evaluate legibility and visual weight in a real-world retail setting. The high-contrast monochrome character art remains immediately recognizable even at a reduced perspective angle. This mockup bridges flat prepress artwork with tangible publishing presentation."
      },
      {
        title: "The Royal Bengal Mystery — Hardcover Edition",
        image: "/images/projects/book-cover-front-cover.png",
        alt: "3D hardcover mockup for The Royal Bengal Mystery",
        description:
          "This hardcover book presentation features The Royal Bengal Mystery, adapted by Mohanlal Banerjee, built around a piercing close-up portrait of a Royal Bengal tiger. Bold white slab-serif display typography is layered directly across the tiger's gaze to create immediate dramatic tension and strong shelf presence. The dark spine carries vertical title lettering paired with structured educational publisher branding at the top and bottom edges. Warm amber fur tones contrast sharply against deep black framing bands to anchor author credits cleanly. The composition demonstrates effective photographic framing and typographic contrast for mystery fiction."
      },
      {
        title: "The Royal Bengal Mystery — Print Spread",
        image: "/images/projects/book-cover-full-spread.png",
        alt: "Complete flat prepress spread for The Royal Bengal Mystery",
        description:
          "This complete flat prepress layout displays the back cover, spine, and front cover of The Royal Bengal Mystery arranged side by side for print production. The back panel organizes uppercase editorial disclaimer text, publisher details, website URL, and barcode placement within an aligned grid. A vertical spine strip separates the back copy from the full-bleed tiger photography on the right-hand front cover. Consistent black header and footer bars lock all three panels into a cohesive visual system. Reviewing the unfolded spread confirms accurate fold lines, margin safety, and balanced typography across every surface."
      }
    ]
  },
  {
    id: "social-media-ads",
    slug: "social-media-advertisement-designs",
    title: "Social Media Advertisement Designs",
    category: "Social Media Ads",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/social-ad-course-promo.png",
    software: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
    summary: "High-converting digital admission banners and lead-generation creatives for NIELIT Kolkata and CodeBuzzers.",
    description:
      "This digital advertising collection features promotional social media creatives designed for educational admissions at NIELIT Kolkata and digital marketing campaigns for CodeBuzzers. Each creative is engineered to capture rapid scrolling attention through bold headlines, structured information blocks, and unmistakable call-to-action badges. Clean colour blocking—pairing institutional blues and warm yellows with high-contrast digital accents—guides the viewer's eye effortlessly from value proposition to contact details. Complex course syllabi, eligibility criteria, and fee waivers are broken down into scannable visual hierarchies suited for mobile screens. These campaigns demonstrate practical commercial design focused on clarity, brand trust, and audience conversion.",
    gallery: [
      {
        title: "NIELIT Kolkata — O & A Level Admission Banner",
        image: "/images/projects/social-ad-course-promo.png",
        alt: "Social media admission banner for NIELIT Kolkata IT courses",
        description:
          "This digital admission creative promotes NIELIT Kolkata's 'O' Level and 'A' Level Information Technology courses for prospective students. A vibrant yellow 'Admission Open' badge immediately anchors the top-left corner alongside official institutional branding. Structured dark-blue cards separate course duration and eligibility details so viewers can compare pathways quickly on mobile feeds. Prominent callouts highlight tuition fee exemptions for SC/ST candidates alongside Jadavpur and Salt Lake campus addresses. The layout balances dense institutional information with clean visual pacing and modern student photography."
      },
      {
        title: "CodeBuzzers — Google Listing Lead Campaign",
        image: "/images/projects/social-ad-google-listing.png",
        alt: "Promotional social media graphic for Google Business Listing services",
        description:
          "This promotional social media post advertises Google Business Listing optimization services for CodeBuzzers to help local enterprises generate organic leads. A bold yellow headline paired with a vector megaphone illustration creates an energetic focal point on the left side of the frame. Subtle circular target graphics and social media platform icons reinforce the digital reach theme without cluttering the background. Contact phone numbers, website URL, and email details are neatly docked along the lower bar for instant enquiry. High-contrast navy, white, and amber tones ensure maximum readability across Instagram and Facebook feeds."
      },
      {
        title: "CodeBuzzers — Business Boost Digital Ad",
        image: "/images/projects/social-ad-business-boost.png",
        alt: "Square social media creative featuring smartphone growth illustration",
        description:
          "This square digital advertisement presents a Business Boost campaign designed to drive online enquiries through search visibility. A dynamic smartphone illustration displaying rising analytics bars and location pins visually communicates local search growth at a glance. Strong geometric typography stacks the core message on the left while a bright yellow 'Free Consultation' pill acts as a clear conversion trigger. Direct contact credentials sit cleanly along the base to reduce friction for prospective business owners. The composition blends vector storytelling with disciplined commercial hierarchy."
      },
      {
        title: "NIELIT Kolkata — NSQF & Certificate Course Flyer",
        image: "/images/projects/social-ad-course-detail.png",
        alt: "Comprehensive course catalogue flyer for NIELIT Kolkata NSQF and certificate programs",
        description:
          "This information-rich promotional flyer organizes NIELIT Kolkata's NSQF long-term programs and short-term job-oriented certificate courses into a single structured layout. Two distinct column cards categorize offerings ranging from Cyber Security and Python Data Science to Multimedia Development, 2D Animation, and AutoCAD. Circular badges spotlight key student incentives including free SC/ST tuition and zero GST on NSQF courses. Campus contact numbers and an online registration link are placed prominently at the bottom for immediate enrollment action. The design proves how multi-item academic schedules can remain legible and inviting."
      }
    ]
  },
  {
    id: "web-flyer",
    slug: "web-flyer-design",
    title: "Web Flyer Design",
    category: "Web Flyer",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/web-flyer-kolkata-event.png",
    software: ["Adobe Photoshop", "Adobe Illustrator"],
    summary: "Cultural Durga Puja digital banners and vibrant nightlife invitation flyers crafted for web sharing.",
    description:
      "This web flyer series showcases digital event announcements created for iconic Kolkata Durga Puja celebrations and private anniversary gatherings. Each composition adapts its visual atmosphere to match the cultural mood of the occasion—from traditional Bengali festive artistry to contemporary evening entertainment. Expressive Bengali calligraphy, custom vector illustrations, and atmospheric lighting effects work together to establish instant thematic resonance. Key event metadata—including dates, venues, organizers, and partner logos—are structured cleanly for effortless reading on smartphones. These designs highlight versatility across cultural heritage graphics and modern commercial event promotion.",
    gallery: [
      {
        title: "Kalpana Welfare Society — Alpona Cultural Flyer",
        image: "/images/projects/web-flyer-kolkata-event.png",
        alt: "Bengali Durga Puja cultural flyer featuring traditional Alpona art",
        description:
          "This cultural web flyer celebrates a 14-kilometer community Alpona installation organized by Kalpana Welfare Society during Durga Puja. Rich crimson and gold tones evoke traditional Bengali festivity while framing an expressive hand-painted portrait of Goddess Durga on the right. Graceful Bengali typography presents the event theme, patron credits, and artistic direction in a balanced vertical hierarchy. Traditional lotus and conch motifs accent the borders to reinforce cultural authenticity. The layout merges heritage illustration with clean digital poster typography."
      },
      {
        title: "Mudiali Club — Durga Puja 2024 Digital Banner",
        image: "/images/projects/web-flyer-book-promo.png",
        alt: "Digital promotional poster for Mudiali Club Durga Puja 2024",
        description:
          "This digital promotional flyer announces the 2024 Durga Puja festivities for Mudiali Club, one of South Kolkata's celebrated pujo committees. Stylized vector artwork depicts Goddess Durga flanked by traditional dhakis and temple architecture against a warm terracotta sky. Bold Bengali display lettering anchors the upper composition while crisp English subtext invites visitors to witness the celebration. Sponsor and digital partner badges sit cleanly along the lower corners without disrupting the central illustration. The design captures festive energy in a format optimized for social media sharing."
      },
      {
        title: "The Sunset Society — 8th Anniversary Invitation",
        image: "/images/projects/web-flyer-sunset-society.png",
        alt: "Dark-themed celebration flyer for The Sunset Society 8th Anniversary",
        description:
          "This evening celebration flyer invites guests to the 8th Anniversary party of The Sunset Society in Jadavpur, Kolkata. A deep nocturnal backdrop accented with glowing golden bokeh, festive balloons, and metallic confetti establishes an upscale party mood. Oversized gold gradient typography highlights the '8th Anniversary' milestone at the center of the layout. Essential event details—including the March 23, 2025 date, 7 PM start time, DJ dance, and venue address—are neatly aligned beneath the headline. The composition demonstrates effective contrast and celebratory visual hierarchy."
      }
    ]
  },
  {
    id: "price-catalogue",
    slug: "price-catalogue-design",
    title: "Price Catalogue Design",
    category: "Price Catalogue",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/catalogue-cover.png",
    software: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"],
    summary: "Multi-page artisanal product and pricing catalogue designed for Paakhi The Label handmade candles.",
    description:
      "This multi-page commercial product catalogue was designed for Paakhi The Label to showcase its range of artisanal handmade candles. Built around a warm blush-pink and earthy terracotta palette, the layout reflects the handcrafted, boutique character of the brand. Each spread pairs high-clarity product photography with clean pricing tables comparing single-piece and bulk-order rates. Consistent typographic grids, delicate botanical line art, and uniform product framing guide buyers smoothly across every category—from festive ladoo candles to floral daisy and sculptural bubble designs. The catalogue demonstrates structured editorial layout design tailored for retail and wholesale customer conversion.",
    gallery: [
      {
        title: "Paakhi The Label — Catalogue Front Cover",
        image: "/images/projects/catalogue-cover.png",
        alt: "Front cover of Paakhi The Label Handmade Candles Catalogue",
        description:
          "This front cover introduces Paakhi The Label's Handmade Candles Catalogue using a soft pastel blush palette and a clean multi-photo grid. Featured product previews—including daisy, spiral, teddy bear, and festive ladoo candles—give buyers an immediate overview of the collection. The circular brand crest sits prominently at the top center above refined serif title typography. Subtle social media handles and direct WhatsApp ordering contact details are integrated into the lower corners. The cover establishes a cohesive, boutique aesthetic carried throughout the entire booklet."
      },
      {
        title: "Festive Ladoo & Owl Candles — Pricing Sheet 01",
        image: "/images/projects/catalogue-candle-range-1.png",
        alt: "Catalogue page displaying Motichoor Ladoo, Imarti, Modak and Owl candles with prices",
        description:
          "This interior catalogue sheet presents festive sweet-inspired candles—including Motichoor Ladoo, Imarti, and Modak designs—alongside sculptural Owl candles. Each product photograph is framed inside a crisp white card with a warm terracotta price badge underneath for instant scannability. Clear typographic distinctions separate pack sizes, single-unit prices, and discounted bulk rates for wholesale buyers. Delicate botanical line illustrations float softly in the background to add artisanal warmth without competing with product details. The modular grid keeps four distinct SKUs balanced and easy to compare."
      },
      {
        title: "Sculptural & Floral Candles — Pricing Sheet 02",
        image: "/images/projects/catalogue-candle-range-2.png",
        alt: "Catalogue page showcasing Bubble, Spiral, Daisy and Teddy Bear candles",
        description:
          "This second product listing spread showcases contemporary decorative candles including Bubble cubes, ribbed Spiral pillars, Daisy blooms, and Teddy Bear figurines. Maintaining identical card proportions, border treatments, and terracotta pricing pills from the preceding page ensures effortless visual continuity. Buyers can quickly compare individual unit pricing against multi-pack and bouquet options arranged in clean two-column price blocks. Soft pastel tones complement the natural wax textures photographed in each frame. This page exemplifies disciplined multi-page catalogue systems."
      }
    ]
  },
  {
    id: "print-media",
    slug: "print-media-design",
    title: "Print Media Design",
    category: "Print Media",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/print-media-netaji-poster.png",
    software: ["Adobe Illustrator", "Adobe Photoshop", "CorelDRAW"],
    summary: "Institutional commemorative posters and achievement certificates designed for NIELIT Kolkata.",
    description:
      "This print media collection brings together official institutional posters and formal achievement certificates created for NIELIT Kolkata. The designs cover national commemorations including Netaji Jayanti and Republic Day alongside an official student competition certificate. Each layout balances formal Government of India institutional branding with engaging visual storytelling suited for campus noticeboards and print distribution. Custom vector borders, portrait integration, and clean event schedules establish immediate clarity and civic dignity. Together, these pieces reflect practical print production experience within an academic and institutional environment.",
    gallery: [
      {
        title: "NIELIT Kolkata — Netaji Jayanti Poster",
        image: "/images/projects/print-media-netaji-poster.png",
        alt: "Commemorative Netaji Jayanti event poster for NIELIT Kolkata",
        description:
          "This commemorative print poster announces Netaji Jayanti celebrations at NIELIT Kolkata's Jadavpur University Campus on 23rd January. A dignified monochrome portrait of Netaji Subhas Chandra Bose anchors the right side against a textured sky-blue backdrop framed by a traditional geometric border. A bright yellow sunburst badge with a crimson ribbon highlights the event title and date on the upper left. Beneath the headline, a structured yellow schedule box lists flag hoisting, guest speeches, cultural shows, and refreshments. The composition balances patriotic tribute with clear campus event communication."
      },
      {
        title: "NIELIT Kolkata — Certificate of Achievement",
        image: "/images/projects/print-media-certificate.png",
        alt: "Formal Certificate of Achievement layout for NIELIT Digital Painting Competition",
        description:
          "This formal Certificate of Achievement was designed for winners of NIELIT Kolkata's digital painting competition. Flowing organic vector waves in institutional sky blue and vibrant orange frame a clean white central canvas so recipient credentials stand out clearly. Official NIELIT Kolkata branding occupies the top header above bold serif and sans-serif award typography. A gold first-place rosette emblem anchors the bottom center between designated signature and date lines. The layout blends creative artistic flair with the formal structure expected of an accredited institution."
      },
      {
        title: "NIELIT Kolkata — Republic Day Celebration Poster",
        image: "/images/projects/print-media-republic-day.png",
        alt: "Republic Day 26th January celebration poster for NIELIT Kolkata",
        description:
          "This Republic Day poster merges national pride with NIELIT's technological identity through a custom tricolor circuit-tree illustration. Saffron, white, and green digital pathways branch upward into glowing nodes, symbolizing innovation and growth across India. Bold red and charcoal typography announces the 26th January celebration at the Department of Electronics, Jadavpur University Campus, alongside quiz, dance, and singing activities. Official Ministry of Electronics & Information Technology branding grounds the lower banner cleanly. The poster demonstrates thoughtful conceptual symbolism tailored to an IT institute."
      }
    ]
  },
  {
    id: "typography-posters",
    slug: "typography-poster-design",
    title: "Typography Poster Design",
    category: "Typography Poster",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/typography-poster-lets-work.png",
    software: ["Adobe Illustrator", "Adobe Photoshop"],
    summary: "Expressive typographic compositions exploring musical quotes and oversized kinetic letterforms.",
    description:
      "This typography poster series explores how letterforms, scale, and editorial grid structure can act as the primary visual voice of a composition. The collection contrasts an editorial quote poster featuring vintage musical textures with a bold Swiss-inspired typographic poster built from monumental sans-serif blocks. Careful manipulation of font weights, baseline alignment, negative space, and colour contrast guides the viewer's eye through each message. Rather than relying on heavy photography, these designs use rhythm, proportion, and typographic tension to create memorable visual impact. They highlight a strong foundation in display typography and experimental poster layout.",
    gallery: [
      {
        title: "Notes For Today — Editorial Music Quote Poster",
        image: "/images/projects/typography-poster-donuts.png",
        alt: "Editorial typography poster featuring Billy Joel quote and vintage guitar backdrop",
        description:
          "This editorial typography poster pairs a quote by musician Billy Joel with a warm, vintage acoustic guitar backdrop. Layered serif and geometric sans-serif typefaces create strong hierarchy between the 'Notes For Today' header, the central quote, and the expressive 'gratifying!' callout. Circular badge stamps and subtle paper grain add tactile analog warmth reminiscent of classic vinyl sleeve design. Contrasting black, off-white, and warm terracotta blocks organize the reading flow naturally from top to bottom. The piece illustrates how expressive typography can translate musical mood into print."
      },
      {
        title: "Let's Work Together — Bold Display Poster",
        image: "/images/projects/typography-poster-lets-work.png",
        alt: "High-impact oversized typography poster reading Let's Work Together",
        description:
          "This graphic poster turns the collaborative invitation 'Let's Work Together' into a monumental typographic architecture. Ultra-bold condensed letterforms fill the vertical canvas edge-to-edge, alternating between warm cream and burnt-orange accents against a deep charcoal background. Tight tracking and stacked baseline alignment create an interlocking visual rhythm that commands attention even from across a room. Subtle directional arrows and micro-labels reinforce the graphic grid without distracting from the primary headline. This poster demonstrates confident command of scale, negative space, and kinetic letterform composition."
      }
    ]
  },
  {
    id: "self-branding",
    slug: "self-branding-promotional-identity",
    title: "Self Branding & Promotional Identity Designs",
    category: "Self Branding",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/self-branding-zelna-marble-poster.png",
    software: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
    summary: "Complete brand identity systems, stationery mockups, and campaign visuals for Zegna Marbles and Jeetlay-Davidson.",
    description:
      "This comprehensive branding and promotional identity showcase presents multi-touchpoint visual systems developed for Zegna Marbles and Jeetlay-Davidson Cycles. For Zegna Marbles, the work spans a geometric mosaic monogram, corporate business card mockups, promotional web banners, and a tri-fold showroom brochure. For Jeetlay-Davidson Cycles, a heritage shield emblem anchors high-adrenaline lifestyle posters and editorial print spreads. Across both brands, strict consistency in colour palettes, custom logotypes, and photographic art direction demonstrates how a core identity translates seamlessly across print, stationery, and digital advertising.",
    gallery: [
      {
        title: "Zegna Marbles — Promotional Web Banner",
        image: "/images/projects/self-branding-zelna-marble-poster.png",
        alt: "Promotional landscape banner for Zegna Marbles Kolkata",
        description:
          "This horizontal promotional banner showcases Zegna Marbles' luxury tile and marble collections using dynamic diagonal framing. Three angled photo windows display marble bathroom and living room installations against a bold crimson field. A bright yellow geometric panel on the right highlights the headline 'We Build For Your Comfort' alongside showroom address details in Pratapgarh, Kolkata. Service badges for 24x7 support and on-time delivery reinforce customer trust. The layout demonstrates strong diagonal movement and high-contrast commercial hierarchy."
      },
      {
        title: "Zegna Marbles — Corporate Business Card Mockup",
        image: "/images/projects/self-branding-zelna-marble-card-mockup.png",
        alt: "3D mockup of Zegna Marbles front and back business cards",
        description:
          "This realistic 3D stationery mockup presents the front and reverse sides of Zegna Marbles' corporate business card resting on textured stone. The front layout pairs distributor contact details on the left with the stained-glass 'Z' monogram on the right, framed by curved crimson and black corner accents. The reverse side features a bold full-bleed crimson surface centered around the geometric Zegna Marbles emblem. Clean sans-serif typography ensures phone numbers, email, and website credentials remain crisp at small print scale. The mockup illustrates cohesive brand application on tactile print collateral."
      },
      {
        title: "Zegna Marbles — Tri-Fold Brochure Layout",
        image: "/images/projects/self-branding-zelna-marble-ad.png",
        alt: "Multi-panel corporate brochure spread for Zegna Marbles",
        description:
          "This corporate brochure layout organizes Zegna Marbles' company mission, showroom gallery, and customer service pillars into a dynamic two-part spread. Circular photo cutouts showcase marble slabs and interior installations over sweeping crimson and black waves on the left panel. On the right, clean white space highlights the Zegna Marbles crest, mission statement, key advantages, and a scannable QR code for instant digital consultation. Diagonal red accent bars guide the eye toward showroom display racks. The spread balances rich product photography with structured corporate storytelling."
      },
      {
        title: "Zegna Marbles — Showroom Identity & Ad",
        image: "/images/projects/self-branding-zelna-marble-brandmark.png",
        alt: "Brand identity advertisement for Zegna Marbles showroom in Kolkata",
        description:
          "This promotional brand sheet highlights Zegna Marbles' reputation as a premier marble and tile destination in Kolkata. A clean light-grey canvas allows the multicolored mosaic 'Z' brand mark and architectural interior photography to stand out without visual clutter. Bold crimson headlines and concise bullet points communicate expert consultation, after-sales support, and competitive pricing. Bottom contact strips provide direct phone numbers and web links for showroom bookings. The design exemplifies clean corporate layout discipline."
      },
      {
        title: "Jeetlay-Davidson Cycles — Lifestyle Campaign Poster",
        image: "/images/projects/self-branding-motorcycle-poster.png",
        alt: "Outdoor motorcycle lifestyle advertisement for Jeetlay-Davidson Cycles",
        description:
          "This rugged lifestyle campaign poster pairs the custom Jeetlay-Davidson Cycles shield emblem with dramatic mountain riding photography. Distressed white border textures and tilted orange stencil typography reading 'No GPS. Just Ride!' inject raw adventure energy into the frame. Beneath the main photograph, a gritty typographic footer reinforces the brand ethos with bold condensed lettering. High-contrast orange, black, and white colours tie the badge seamlessly to the outdoor landscape. The poster captures authentic automotive culture and strong brand attitude."
      },
      {
        title: "Jeetlay-Davidson Cycles — Editorial Print Spread",
        image: "/images/projects/self-branding-motorcycle-ad.png",
        alt: "Two-page editorial brand advertisement for Jeetlay-Davidson Cycles",
        description:
          "This editorial print advertisement pairs atmospheric urban alley motorcycle photography with high-impact brand storytelling. Oversized black display typography on the right declares 'Turn The Key. Twist The Throttle. Feel Alive.' above concise brand copy about rider desirability. The orange-and-black bar-and-shield logo anchors the lower corner alongside dealership contact details. Generous white space around the headline balances the moody, film-toned photograph on the opposite side. This layout showcases magazine-grade editorial composition."
      }
    ]
  },
  {
    id: "logo-design",
    slug: "logo-design",
    title: "Logo Design",
    category: "Logo Design",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/logo-combat-sports-academy.png",
    software: ["Adobe Illustrator", "CorelDRAW"],
    summary: "Vector emblem and medical brand identity systems crafted for Combat Sports Academy and Mandrake Polyclinic.",
    description:
      "This logo design portfolio showcases custom vector brand marks developed for sports athletics and healthcare sectors. The featured identities include a bold heraldic crest for The Old School Combat Sports Academy and a clean clinical identity system for Mandrake Diagnostic and Polyclinic. Each mark is constructed with scalable vector geometry to ensure crisp reproduction across signage, uniforms, stationery, and digital platforms. Careful colour psychology—energetic royal blue and gold for athletics versus trustworthy cyan and slate grey for diagnostics—reinforces each organization's core personality. Presentation boards demonstrate logo lockups, monochrome adaptability, and real-world promotional applications.",
    gallery: [
      {
        title: "The Old School Combat Sports Academy — Crest & Launch",
        image: "/images/projects/logo-combat-sports-academy.png",
        alt: "Primary badge logo and grand opening banner for The Old School Combat Sports Academy",
        description:
          "This identity presentation showcases the crest emblem and grand opening promotional graphic for The Old School Combat Sports Academy. Inside a scalloped circular seal, a powerful athlete silhouette is framed by victory laurel wreaths and three stars representing discipline and excellence. Arched yellow ribbons carry the academy name in bold sans-serif capitals over a deep royal-blue athletic backdrop. The accompanying launch banner demonstrates how the emblem anchors promotional announcements with high-visibility contrast. Every vector curve is engineered for clean embroidery on training gear and large-format gym signage."
      },
      {
        title: "Mandrake Diagnostic & Polyclinic — Identity Variations",
        image: "/images/projects/logo-mandlake-primary.png",
        alt: "Logo lockup variations and brand grid for Mandrake Diagnostic and Polyclinic",
        description:
          "This brand identity sheet presents primary and secondary logo lockups for Mandrake Diagnostic and Polyclinic. The custom geometric mark combines a clinical cross symbol with a stylized 'M' monogram rendered in calming medical cyan and charcoal grey. Multiple horizontal, stacked, and icon-only configurations demonstrate adaptability across prescription pads, lab reports, exterior signage, and digital avatars. Clean geometric typography ensures effortless legibility for patients of all ages. The presentation highlights disciplined identity-system thinking."
      },
      {
        title: "Mandrake Polyclinic — Brand Architecture Board",
        image: "/images/projects/logo-mandlake-variations.png",
        alt: "Corporate identity showcase displaying Mandrake logo on dark and light backgrounds",
        description:
          "This brand architecture board evaluates the Mandrake Diagnostic and Polyclinic logo across contrasting light and dark surface treatments. By testing positive and reversed colourways side by side, the sheet verifies that the interlocking cross-and-monogram symbol retains clarity in every application. Supporting sub-brand lockups distinguish general polyclinic consultations from specialized diagnostic lab services. Balanced spacing and consistent stroke weights give the entire visual system a trustworthy, modern healthcare presence."
      }
    ]
  },
  {
    id: "packaging-design",
    slug: "packaging-design",
    title: "Packaging Design",
    category: "Packaging Design",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/packaging-charnminar-box-mockup.png",
    software: ["Adobe Illustrator", "Adobe Photoshop"],
    summary: "Structural carton dieline engineering and 3D retail packaging mockup for Charminar.",
    description:
      "This packaging design project demonstrates end-to-end structural carton development from flat print dieline to realistic three-dimensional retail mockup. Created for the heritage Charminar brand, the design integrates detailed architectural line illustration of Hyderabad's iconic Charminar monument with an intricate geometric lattice pattern. Warm copper, cream, and deep rust hues evoke classic heritage craftsmanship while maintaining crisp shelf differentiation. Regulatory warning panels, side-panel branding, top lid flaps, and glue tabs are accurately mapped across the unfolded die-cut template. Together, the dieline and 3D box render showcase technical prepress precision paired with strong commercial surface graphics.",
    gallery: [
      {
        title: "Charminar Carton — Unfolded Print Dieline",
        image: "/images/projects/packaging-charnminar-carton-dieline.png",
        alt: "Flat unfolded packaging dieline showing front, back, side panels and statutory warnings",
        description:
          "This flat unfolded packaging dieline maps out every exterior panel, crease line, and regulatory block for the Charminar flip-top carton. Detailed architectural vector artwork of the Charminar monument sits framed inside an ornate cream cartouche against a repeating copper geometric lattice. Arched display lettering and a metallic red ribbon motif create strong horizontal rhythm across both primary faces. Statutory health warnings and helpline details are cleanly integrated into the lower panel without disrupting brand symmetry. This layout demonstrates technical readiness for die-cutting and offset carton printing."
      },
      {
        title: "Charminar Carton — 3D Assembled Box Mockup",
        image: "/images/projects/packaging-charnminar-box-mockup.png",
        alt: "Three-dimensional standing box mockup of the Charminar package design",
        description:
          "This three-dimensional assembled box mockup brings the flat Charminar carton dieline to life in a clean studio perspective. Viewing the upright hinged-lid box illustrates how the geometric lattice wraps smoothly across the top flap and side gussets. Vertical Charminar lettering along the left spine ensures brand recognition from angled retail shelf viewpoints. Subtle gold foil-style divider bands and soft studio shadows highlight the tactile structure of the folded carton. The render confirms cohesive visual alignment across every corner and crease."
      }
    ]
  },
  {
    id: "tshirt-design",
    slug: "t-shirt-design",
    title: "T-Shirt Design",
    category: "T-Shirt Design",
    hidden: false,
    is_deleted: false,
    featured: true,
    cover: "/images/projects/tshirt-design-front-mockup.png",
    software: ["Adobe Illustrator", "Adobe Photoshop"],
    summary: "Custom Bengali cultural character illustration and apparel mockup celebrating Gopal Bhar.",
    description:
      "This apparel graphic design project celebrates Bengal's beloved legendary court jester, Gopal Bhar, through custom vector character illustration and garment visualization. Designed for screen and DTG apparel printing, the artwork combines expressive cartoon portraiture with hand-crafted Bengali typography reading 'Hasir Raja! Gopal Bhar' (King of Laughter). Bold ochre, burnt sienna, and crisp white accents pop vividly against a jet-black cotton tee. Presenting both the isolated vector graphic and an on-model apparel mockup demonstrates complete garment print readiness, scale calibration, and cultural merchandising appeal.",
    gallery: [
      {
        title: "Gopal Bhar — Isolated Vector Apparel Graphic",
        image: "/images/projects/tshirt-design-graphic.png",
        alt: "Standalone vector illustration of Gopal Bhar with Bengali typography for T-shirt print",
        description:
          "This standalone vector illustration showcases the complete T-shirt print artwork inspired by the iconic Bengali folk character Gopal Bhar. A cheerful, expressive character portrait sits inside a circular badge backed by ink-splatter textures and a warm terracotta vertical banner. Above the character's head, a glowing lightbulb doodle symbolizes wit and quick-thinking humor, flanked by a curved yellow pill reading 'Hasir Raja!'. Bold outlined Bengali lettering anchors the base for unmistakable visual punch. Clean vector paths and separated spot colours ensure crisp screen-printing reproduction."
      },
      {
        title: "Gopal Bhar — Black Crewneck Apparel Mockup",
        image: "/images/projects/tshirt-design-front-mockup.png",
        alt: "On-model black T-shirt mockup featuring the Gopal Bhar chest print",
        description:
          "This on-model apparel mockup previews the Gopal Bhar illustration printed across the chest of a classic black crewneck T-shirt. Natural fabric folds, soft daylight highlights, and realistic ink integration show how the warm yellow and terracotta palette pops against dark cotton. Chest placement and graphic proportions are calibrated to sit comfortably above the torso midline without distortion. This visualization bridges digital illustration with commercial streetwear and cultural merchandise production."
      }
    ]
  }
];

export const experience = [
  {
    id: "nielit-faculty",
    title: "Multimedia Faculty",
    organisation: "NIELIT Kolkata",
    employmentType: "Faculty / Design Educator",
    dates: "Current Role",
    hidden: false,
    is_deleted: false,
    description:
      "Currently working as Multimedia Faculty at NIELIT Kolkata (National Institute of Electronics & Information Technology). Delivering practical training in graphic design software, print and digital layout principles, image retouching, typography, and visual communication while designing official institutional event posters, admission creatives, and certificates."
  }
];

export const education = [];

export const socials = [
  { id: "email-direct", platform: "Email", url: "mailto:aritradassharma16@gmail.com", hidden: false, is_deleted: false },
  { id: "phone-direct", platform: "Phone", url: "tel:+919038397432", hidden: false, is_deleted: false }
];

export const contact = {
  heading: "Let's Create Something Together.",
  subtitle:
    "Have a creative project, brand identity requirement, or teaching collaboration in mind? Reach out directly and let's bring your visual story to life.",
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
  buttonText: "Send a Message"
};

export const categories = [
  { id: "book-cover", name: "Book Cover", hidden: false, is_deleted: false },
  { id: "social-media-ads", name: "Social Media Ads", hidden: false, is_deleted: false },
  { id: "web-flyer", name: "Web Flyer", hidden: false, is_deleted: false },
  { id: "price-catalogue", name: "Price Catalogue", hidden: false, is_deleted: false },
  { id: "print-media", name: "Print Media", hidden: false, is_deleted: false },
  { id: "typography-poster", name: "Typography Poster", hidden: false, is_deleted: false },
  { id: "self-branding", name: "Self Branding", hidden: false, is_deleted: false },
  { id: "logo-design", name: "Logo Design", hidden: false, is_deleted: false },
  { id: "packaging-design", name: "Packaging Design", hidden: false, is_deleted: false },
  { id: "tshirt-design", name: "T-Shirt Design", hidden: false, is_deleted: false }
];

export const services = [
  {
    id: "print-digital",
    title: "Print & Digital Design",
    description: "End-to-end visual communication for social media campaigns, web banners, event flyers, posters, brochures, and multi-page product catalogues.",
    hidden: false,
    is_deleted: false
  },
  {
    id: "brand-identity",
    title: "Brand Identity & Logo",
    description: "Distinctive symbol and typography-based logos, corporate stationery systems, and cohesive brand identity presentations built for lasting recognition.",
    hidden: false,
    is_deleted: false
  },
  {
    id: "packaging-apparel",
    title: "Packaging & T-Shirt Graphics",
    description: "Print-ready carton dielines, product labels, 3D packaging mockups, and custom illustrated T-shirt graphics tailored for commercial production.",
    hidden: false,
    is_deleted: false
  },
  {
    id: "retouching-editorial",
    title: "Book Covers & Retouching",
    description: "Complete book jacket layouts—front, spine, and back—alongside precision image editing, colour grading, and layout composition.",
    hidden: false,
    is_deleted: false
  }
];

export const certifications = [];
export const achievements = [];
export const testimonials = [];
export const customSections = [];

export const sectionSettings = {
  home: true,
  about: true,
  portfolio: true,
  skills: true,
  experience: true,
  education: false,
  services: true,
  certifications: false,
  achievements: false,
  testimonials: false,
  contact: true
};

export const websiteSettings = {
  siteTitle: "Aritra Das Sharma | Graphic Designer & Multimedia Faculty",
  theme: "orange-black",
  accentColor: "#ff6b35",
  published: true
};

const initialData = {
  profile,
  skills,
  projects,
  experience,
  education,
  socials,
  contact,
  categories,
  services,
  certifications,
  achievements,
  testimonials,
  customSections,
  sectionSettings,
  websiteSettings
};

export default initialData;