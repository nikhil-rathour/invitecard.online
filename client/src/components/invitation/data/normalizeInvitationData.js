/**
 * Normalizes raw invitation data or template demo data into a complete,
 * structured model for the immersive Digital Invitation Renderer.
 */

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80',
]

export function normalizeInvitationData(raw = {}) {
  const names = raw.names || {}
  const basicInfo = raw.basicInfo || {}
  const hosts = raw.hosts || {}
  const story = raw.story || {}
  const theme = raw.theme || raw.themeConfig || {}

  // Extract names
  const primary = names.primary || basicInfo.title || 'Aarav & Ananya'
  const nameParts = primary.split('&').map((n) => n.trim())
  const groomName = nameParts[0] || 'Aarav'
  const brideName = nameParts[1] || 'Ananya'

  const secondary = names.secondary || basicInfo.secondaryName || 'Together with their families'

  // Extract events
  const rawEvents = raw.events || basicInfo.events || []
  const events = rawEvents.length > 0
    ? rawEvents.map((evt, idx) => ({
        id: evt._id || `evt_${idx}`,
        title: evt.title || 'Ceremony',
        date: evt.date || '2027-01-30',
        startTime: evt.startTime || '16:00',
        endTime: evt.endTime || '',
        venueName: evt.venueName || 'Rambagh Palace',
        address: evt.address || 'Bhawani Singh Road, Jaipur, Rajasthan',
        mapsUrl: evt.mapsUrl || 'https://maps.google.com/?q=Rambagh+Palace+Jaipur',
        dressCode: evt.dressCode || (idx % 2 === 0 ? 'Pastel Ethnic Wear' : 'Royal Traditional'),
        description: evt.description || 'Join us for music, dance, and joyous celebrations.',
      }))
    : [
        {
          id: 'evt_1',
          title: 'Mehendi & Sangeet',
          date: '2027-01-29',
          startTime: '16:00',
          endTime: '22:00',
          venueName: 'The Royal Courtyard, Rambagh Palace',
          address: 'Bhawani Singh Road, Jaipur, Rajasthan',
          mapsUrl: 'https://maps.google.com/?q=Rambagh+Palace+Jaipur',
          dressCode: 'Floral & Vibrant Ethnic',
          description: 'An evening of henna, music, dance performances, and festive dinner.',
        },
        {
          id: 'evt_2',
          title: 'Wedding Ceremony (Pheras)',
          date: '2027-01-30',
          startTime: '10:00',
          endTime: '15:00',
          venueName: 'Subharambh Pavilion, Jai Mahal Palace',
          address: 'Jacob Road, Civil Lines, Jaipur',
          mapsUrl: 'https://maps.google.com/?q=Jai+Mahal+Palace+Jaipur',
          dressCode: 'Royal Traditional Wear',
          description: 'The sacred union of seven vows under the starlight mandap.',
        },
        {
          id: 'evt_3',
          title: 'Grand Reception',
          date: '2027-01-30',
          startTime: '19:30',
          endTime: '23:30',
          venueName: 'The Maharani Lawn',
          address: 'Civil Lines, Jaipur',
          mapsUrl: 'https://maps.google.com/?q=Jai+Mahal+Palace+Jaipur',
          dressCode: 'Formal Black Tie or Indo-Western',
          description: 'A grand celebration with fine dining, music, and royal hospitality.',
        },
      ]

  // Primary wedding date for countdown and date reveal
  const weddingDate = events[1]?.date || events[0]?.date || '2027-01-30'

  return {
    slug: raw.slug || 'royal-wedding',
    title: raw.title || basicInfo.title || `${groomName} & ${brideName}'s Wedding`,

    theme: {
      layout: theme.layout || 'royal',
      primaryColor: theme.primaryColor || '#8B1E3F',
      primaryDarkColor: theme.primaryDarkColor || '#5E142B',
      goldColor: theme.goldColor || '#C89B3C',
      goldLightColor: theme.goldLightColor || '#E8C97A',
      background: theme.background || '#FFF9F2',
      fontDisplay: theme.fontDisplay || 'Cormorant Garamond',
      fontBody: theme.fontBody || 'DM Sans',
    },

    opening: {
      blessingText: raw.opening?.blessingText || '|| Shree Ganeshay Namah ||',
      blessingSubtitle: raw.opening?.blessingSubtitle || 'With the blessings of our ancestors & family elders',
      title: `${groomName} & ${brideName}`,
      subtitle: raw.opening?.subtitle || secondary,
      openButtonText: 'Open Invitation',
    },

    couple: {
      groom: {
        name: groomName,
        fullName: raw.couple?.groom?.fullName || `${groomName} Sharma`,
        family: hosts.groomFamily || raw.couple?.groom?.family || 'Son of Mr. & Mrs. Rajesh Sharma',
        image: raw.couple?.groom?.image || DEFAULT_IMAGES[0],
      },
      bride: {
        name: brideName,
        fullName: raw.couple?.bride?.fullName || `${brideName} Mehta`,
        family: hosts.brideFamily || raw.couple?.bride?.family || 'Daughter of Mr. & Mrs. Vikram Mehta',
        image: raw.couple?.bride?.image || DEFAULT_IMAGES[1],
      },
    },

    invitationMessage: {
      quote: story.message || basicInfo.shortMessage || 'Two souls, one heart. A journey of love and togetherness begins.',
      fullMessage:
        raw.invitationMessage?.fullMessage ||
        'With immense joy and gratitude in our hearts, we cordially invite you to celebrate the wedding ceremony of our beloved children as they embark on this beautiful journey of lifelong companionship.',
    },

    dateReveal: {
      date: weddingDate,
      revealText: 'Tap to Reveal Wedding Date',
      locationShort: 'Jaipur, Rajasthan',
    },

    events,

    story: {
      title: 'Our Story',
      quote: story.coupleStory || 'From a casual hello to a forever promise...',
      chapters: raw.story?.chapters || [
        {
          year: '2022',
          title: 'First Crossing of Paths',
          description: 'Met during a coffee catchup in Mumbai, where a 15-minute chat turned into 4 hours of non-stop conversations.',
          image: DEFAULT_IMAGES[2],
        },
        {
          year: '2024',
          title: 'The Proposal',
          description: 'Under the golden sunset of Udaipur, surrounded by royal heritage and gentle lake breezes, he popped the question.',
          image: DEFAULT_IMAGES[3],
        },
        {
          year: '2027',
          title: 'The Beginning of Forever',
          description: 'Surrounded by our dearest family and friends, we step into a lifetime of shared laughter and celebrations.',
          image: DEFAULT_IMAGES[4],
        },
      ],
    },

    gallery: raw.gallery || [
      { url: DEFAULT_IMAGES[0], caption: 'The Royal Pre-wedding Shoot', aspect: 'portrait' },
      { url: DEFAULT_IMAGES[1], caption: 'Sunset Moments in Jaipur', aspect: 'landscape' },
      { url: DEFAULT_IMAGES[2], caption: 'Together Under Golden Skies', aspect: 'portrait' },
      { url: DEFAULT_IMAGES[3], caption: 'Love & Heritage', aspect: 'square' },
      { url: DEFAULT_IMAGES[4], caption: 'Forever & Always', aspect: 'landscape' },
    ],

    social: {
      hashtag: raw.social?.hashtag || `#${groomName}Weds${brideName}`,
      instagramUsername: raw.social?.instagramUsername || `${groomName.toLowerCase()}.${brideName.toLowerCase()}`,
      subtitle: 'Share your photos & wishes with us on Instagram',
    },

    video: {
      title: 'Our Pre-Wedding Film',
      subtitle: 'A glance into our journey of togetherness',
      youtubeUrl: raw.video?.youtubeUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: DEFAULT_IMAGES[1],
    },

    countdown: {
      targetDate: weddingDate,
      title: 'Counting Down to The Big Day',
    },

    venues: raw.venues || [
      {
        name: 'Rambagh Palace',
        role: 'Mehendi & Sangeet Venue',
        address: 'Bhawani Singh Road, Jaipur, Rajasthan 302005',
        mapsUrl: 'https://maps.google.com/?q=Rambagh+Palace+Jaipur',
        image: DEFAULT_IMAGES[0],
      },
      {
        name: 'Jai Mahal Palace',
        role: 'Wedding & Reception Venue',
        address: 'Jacob Road, Civil Lines, Jaipur, Rajasthan 302006',
        mapsUrl: 'https://maps.google.com/?q=Jai+Mahal+Palace+Jaipur',
        image: DEFAULT_IMAGES[2],
      },
    ],

    rsvp: {
      enabled: true,
      contactPhone: hosts.contactPhone || '+91 98765 43210',
      contactEmail: hosts.contactEmail || 'celebration@invitecard.online',
    },

    wishes: {
      enabled: true,
      initialWishes: raw.wishes?.initialWishes || [
        {
          id: 'w1',
          name: 'Anil & Sunita Kapoor',
          message: 'Wishing both of you a lifetime of laughter, joy, and endless love! So excited for Jaipur!',
          createdAt: '2026-09-20T10:00:00Z',
        },
        {
          id: 'w2',
          name: 'Rohan & Priyal',
          message: 'Congratulations Aarav & Ananya! Can’t wait to dance at the Sangeet!',
          createdAt: '2026-09-21T14:30:00Z',
        },
      ],
    },

    hosts: {
      brideFamily: hosts.brideFamily || 'Sharma Family',
      groomFamily: hosts.groomFamily || 'Mehta Family',
      hostNames: hosts.hostNames || 'With Best Compliments From Friends & Relatives',
    },
  }
}
