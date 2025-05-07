import { Categories } from './Categories';
import { Hero } from './Hero';
import { Provider } from './Provider';
import { Work } from './Work';

export function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Categories />
      <Provider />
    </>
  );
}
