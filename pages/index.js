import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Canvas from '../components/canvas';
import Text from '../components/text';

export default function Home() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return (
    <>
      <Head>
        <title>Temp Kei</title>
        <meta
          name='description'
          content="Christopher Kei's temporary website"
        />
        <link rel='icon' href='/base.svg' />
      </Head>

      <main>
        <Canvas width={width} height={height} />
        <Text />
      </main>
    </>
  );
}
