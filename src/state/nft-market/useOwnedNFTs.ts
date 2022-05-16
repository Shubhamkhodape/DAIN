import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import useSigner from "state/signer";
import { parseRawNFT } from "./helper";
import { NFT } from "./interfaces";
import {
  GetOwnedNFTs,
  GetOwnedNFTsVariables,
  GetOwnedNFTs_nfts,
} from "./__generated__/GetOwnedNFTs";

const useOwnedNFTs = () => {
  const { address } = useSigner();

  const { data } = useQuery<GetOwnedNFTs, GetOwnedNFTsVariables>(
    GET_OWNED_NFTS,
    { variables: { owner: address ?? "" }, skip: !address }
  );
  const ownedNFTs = data?.nfts.map(parseRawNFT);

  return { ownedNFTs };
};


const GET_OWNED_NFTS = gql`
  query GetOwnedNFTs($owner: String!) {
    nfts(where: { to: $owner }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;

export default useOwnedNFTs;