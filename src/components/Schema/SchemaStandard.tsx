import React from "react";
import {Box, HStack, Link, Text} from "@chakra-ui/react";
import {OpenContractStandard} from "../../transactions/schemas/types";

export interface TxReceiverInputProps {
  standard: OpenContractStandard;
}

export function SchemaStandard(props: TxReceiverInputProps) {
  return (
    <Box my={2}>
      <Link color={'teal.500'} my={2} target="_blank" href={props.standard.url}>
        Standard
      </Link>
      {props.standard.authors?.length ? (
        <HStack spacing='4px'>
          <Text>Authors:</Text>
          <HStack spacing='12px'>
            {props.standard.authors.map(author => (
              <Link target="_blank" color='teal.500' key={author.name} href={author.url}>{author.name}</Link>
            ))}
          </HStack>
        </HStack>
      ) : null}
    </Box>
  )
}
