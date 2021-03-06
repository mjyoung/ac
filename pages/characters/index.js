import useSWR from 'swr';
import Characters from '../../components/Characters/Characters';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { Container, Table } from 'semantic-ui-react';
import { characters } from '../../data/characters';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function character() {
  const { error } = useSWR('/api/characters', fetcher);
  if (error) return <div>Failed to load</div>;

  const [charList, setCharList] = useState([]);
  const [searchChar, setSearchChar] = useState('');
  const handleChange = (e) => {
    setSearchChar(e.target.value);
  };

  useEffect(() => {
    const results = characters.filter((character) =>
      character.name.toLowerCase().includes(searchChar)
    );
    setCharList(results);
  }, [searchChar]);

  // const species = [];
  // data.forEach((character) => {
  //   if (species.includes(character.species)) {
  //     return data.map((species) => {
  //       return { species };
  //     });
  //   }

  //   species.push(character.species);
  // });
  return (
    <div className="container">
      <Header />
      <Nav />
      <h1>Characters</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchChar}
        onChange={handleChange}
      />
      <Container>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Species</Table.HeaderCell>
              <Table.HeaderCell>Personality</Table.HeaderCell>

              <Table.HeaderCell>Birthday</Table.HeaderCell>
              <Table.HeaderCell>Catchphrase</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Container>

      {charList &&
        charList.map((p, i) => <Characters key={i} characters={p} />)}
      <style jsx global>{`
        body {
          background-image: url(images/acbackground.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>
    </div>
  );
}
