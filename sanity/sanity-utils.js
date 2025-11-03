import { createClient } from "next-sanity";

const client = createClient({
  projectId: "isggn3lk",
  dataset: "production",
  apiVersion: "2025-03-24",
  useCdn: false, // wieder rausnehmen für Production!
});

export async function getHome() {
  return client.fetch(`*[_type == "home"][0]{
  motionPortals {
    headline {
      de,
      en
    },
    images[] {
      asset->{
        _id,
        url
      },
      alt,
      caption {
        de,
        en
      }
    },
    text {
      de,
      en
    }
  },
  skulpturen {
    headline {
      de,
      en
    },
    text {
      de,
      en
    },
  },
  anleitung {
    headline {
      de,
      en
    },
    text {
      de,
      en
    },
    diagram {
      asset->{
        _id, 
        url
      },
      alt,
    },
  }
}
`);
}

export async function getOrte() {
  return client.fetch(`*[_type == "orte"][0]{
  orte[] {
    name,
    artist,
    coordinates {
      longitude,
      latitude
    },
    image {
      asset->{
        _id,
        url
      }
    },
    glb {
      asset->{
        _id,
        url
      }
    },
    zoom,
  },
  text {
    de,
    en
  }
}

`);
}

export async function getProject() {
  return client.fetch(`*[_type == "project"][0]{
  intro {
    headline,
    text {
      de,
      en
    }
  },
  body[] {
    headline {
      de,
      en
    },
    text {
      de,
      en
    },
    images[] {
      asset->{
        _id,
        url
      },
      alt,
      caption {
        de,
        en
      }
    }
  }
}
`);
}

export async function getPeople() {
  return client.fetch(`*[_type == "people"][0]{
  content {
    de,
    en
  }
}`);
}

export async function getLegals() {
  return client.fetch(`*[_type == "legals"][0]{
  text {
    de,
    en
  }
}`);
}

export async function getVideos() {
  return client.fetch(`*[_type == "video"]{
  title {
    de,
    en
  }, 
  slug,
  id
}`);
}

export async function getContact() {
  return client.fetch(`*[_type == "contact"][0]{
  text {
    de,
    en
  }
}`);
}
