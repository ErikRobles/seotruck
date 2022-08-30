import Head from 'next/head';
import Header from '../components/Header';
import CVForm from '../components/CVForm';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Info from '../components/Info';
import Promo from '../components/Promo';

export default function Home() {
  return (
    <div className='m-0'>
      <Head>
        <title>APQ TRUCKING</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Hero
        heading='Discover the Joy of Trucking'
        message='A world of discovery as you hit the open road in this fulfilling and important career.'
      />
      <Info
        infoheading='This Heading Describes Just How Awesome it is To Drive With Us!'
        infomessage='So much information that will wow you, how can we possibly put it into this small paragraph. But we will try.'
      />
      <Promo
        promoheading='Promo'
        promomessage='This is our promotional message or sub-heading.'
      />
      <CVForm />
      <Footer />
    </div>
  );
}
