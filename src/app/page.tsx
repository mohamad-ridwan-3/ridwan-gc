import Container from "../components/container";
import HomeLayout from "../templates/default/home-layout";
import { ResultProductDataT } from "../types/products";
import HomeLayoutTheme1 from "../templates/theme1/home-layout";
import { getTemplate } from "../lib/server-actions/templates/getTemplate";
import { getProducts } from "../lib/server-actions/products/getProducts";

type ImgT = {
  img: string
  path: string
}

export default async function Home() {
  const template = await getTemplate()
  const products: ResultProductDataT = await getProducts(
    template.templateDir === 'default' ?
      20 :
      12
  ) as ResultProductDataT

  const imgURL = process.env.NEXT_PUBLIC_PREFIX

  const banners: ImgT[] = [
    {
      img: `${imgURL}/themes/iIpABe8Eguwdmb0gUkREmSEjRED1YvjR04llI2HX.jpg`,
      path: '/categories/skincare'
    },
    {
      img: `${imgURL}/themes/2rOUKDZrdJosC35Gk4EXY6ayqnhiErz4Nvt5db2a.jpg`,
      path: '/categories/cosmetics'
    }
  ]

  return (
    <Container
      defaultClassName="min-h-[65vh] min-container-h:min-h-screen"
      theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
      templateDir={template.templateDir}
    >
      {template.templateDir === 'default' &&
        <HomeLayout
          banners={banners}
          products={products.data.list}
          templateDir={template.templateDir}
        />
      }
      {template.templateDir === 'theme1' &&
        <HomeLayoutTheme1
          products={products.data.list}
          templateDir={template.templateDir}
        />
      }
    </Container>
  );
}
