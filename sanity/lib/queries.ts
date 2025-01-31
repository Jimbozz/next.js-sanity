import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    title,
    backgroundColor,
    metaData {
      metaDescription,
      openGraphImage{
        ...,
        "imageUrl": asset->url,
        alt
      }
    },
    content[]{
      ...,
      _type == 'headerAndBlock' => {
        header,
        content[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
              "slug": @.reference->slug.current
            }
          }
        },
      },
      _type == 'projectShowcase' => {
        ...,
        projects[]->{
          _type,
          client,
          title,
          "slug": slug.current,
          featuredImage{
              _type == "image" => {
              "imageUrl": asset->url,
              alt
            }
          },
          featuredVideo{
            _type == "file" => {
              "videoUrl": asset->url,
              alt
            }
          },
          //Fetching a list of tags from the specific project
        "tags": content[_type == "titleWithTags"][0]{
          title,
          tagBackgroundColor,
          tagFontColor,
          showcaseProjectTags,
          "labels": listOfTags
        }
          
        }
      },
      _type == "masonryGrid" => {
        ...,
        layout,
        media[] {
          ...,
          _type == "image" => {
            "imageUrl": asset->url,
            alt
          },
          _type == "uploadedVideo" => {
            "videoUrl": asset->url,
            alt
          }
        }
      }
    }
  }
`

export const pagesBySlugQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
    _id,
    coverImage,
    backgroundColor,
    title,
    "slug": slug.current,
    metaData {
      ...,
      metaDescription,
      openGraphImage{
        ...,
        "imageUrl": asset->url,
        alt
      }
    },
    content[]{
      ...,
      _type == 'headerAndTeam' => {
        header,
        teamMembers[]->{
          role,
          phone,
          email,
          slug,
          _id,
          teamMemberImage,
          name
        }
      },
      _type == 'headerAndColumns' => {
        header,
        columns[]{
          ...,
          columnContent[]{
            ...,
            markDefs[]{
              ...,
              _type == "internalLink" => {
                ...,
                "slug": @.reference->slug.current
              }
            }
          }
        }
      },
      _type == "clientLogoCarousel" => {
        carouselItems[]{
          ...,
          "mimeType": asset->mimeType,
          asset
        }
      },
      _type == "masonryGrid" => {
        ...,
        layout,
        media[] {
          ...,
          _type == "image" => {
            "imageUrl": asset->url,
            alt
          },
          _type == "uploadedVideo" => {
            "videoUrl": asset->url,
            alt
          }
        }
      }
    }
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    featuredImage,
    backgroundColor,
    description,
    site,
    "slug": slug.current,
    tags{
        tagBackgroundColor,
        tagFontColor,
        listOfTags
      },
    title,
    metaData {
      metaDescription,
      openGraphImage{
        ...,
        "imageUrl": asset->url,
        alt
      }
    },
    content[]{
      ...,
      _type == "masonryGrid" => {
        ...,
        layout,
        media[] {
          ...,
          _type == "image" => {
            "imageUrl": asset->url,
            alt
          },
          _type == "uploadedVideo" => {
            "videoUrl": asset->url,
            alt
          }
        }
      },
      _type == "titleWithTags" => {
        ...,
        title,
        tagBackgroundColor,
        tagFontColor,
        listOfTags 
      }
    }
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    menuCallToAction{
      ...,
      page->{
        _type,
        "slug": slug.current,
        title
      },
      buttonText
    },
    footerSocialLinks[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          "slug": @.reference->slug.current
        }
      }
    },
    footerLinks[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          "slug": @.reference->slug.current
        }
      }
    },
    footerInfo[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          "slug": @.reference->slug.current
        }
      }
    },
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
