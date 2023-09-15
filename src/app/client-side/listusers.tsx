"use client";

import { gql } from "@apollo/client";
import './style/index.css';
import { useQuery } from "@apollo/client"; // แก้ไขการ import
import React from "react";
import Link from "next/link";
const query = gql`
query pokemons($first: Int!){
  pokemons(first: $first){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;
// เข้าถึงข้อมูลที่ต้องการ
interface GraphQLPokemonResponse {
  pokemons: {
    id: string;
    number: string;
    name: string;
    weight: {
      minimum: string;
      maximum: string;
    };
    height: {
      minimum: string;
      maximum: string;
    };
    classification: string;
    types: string[];
    resistant: string[];
    weaknesses: string[];
    fleeRate: number;
    maxCP: number;
    maxHP: number;
    image: string;
  }[];
}
// สร้าง ตัวรับข้อมูลโดยสามารถกำหนดได้วส่าต้องการอะไรบ้าง
export default function ListUsers() {
  const [count, setCount] = React.useState(0);
  const { data, error } = useQuery<
    GraphQLPokemonResponse>(query, {
      variables: { first: count }, // แก้ไขตรงนี้เป็นตัวแปรจริง ๆ ที่คุณต้องการใช้
    });

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 0 }}>
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h4 className="count" style={{ marginBottom: 16 }}>{count}</h4>
        <button className="btn" onClick={() => setCount((prev) => prev + 1)}>increment</button>
        <button className="btn" 
          onClick={() => setCount((prev) => prev - 1)}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button className="btn"  onClick={() => setCount(0)}>reset</button>
      </div>

      {error ? (
        <p>Oh no, there was an error ...</p>
      ) : data ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data?.pokemons.map((pokemon) => (
            <Link
        
            href={pokemon.image}
            target="_blank"
            rel="noreferrer"
              id="pokemon-card"
              key={pokemon.id}
              style={{ border: "2px solid skyblue", borderRadius: "10px", textAlign: "center" }}
            >
              <img
                src={`${pokemon.image}`}
                alt={pokemon.classification}
                style={{ height: 180, width: 180 }}
              />
              <h3>{pokemon.name}</h3>
              <h5>{pokemon.types}</h5>
              <h5>{pokemon.weaknesses}</h5>
            </Link>
          ))}
        </div>
      ) : null}
    </main>
  );
}
