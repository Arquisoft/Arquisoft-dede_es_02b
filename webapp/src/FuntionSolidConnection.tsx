import * as React from "react";

import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  Thing,
} from "@inrupt/solid-client";

import { VCARD } from "@inrupt/vocab-common-rdf";

export default function FuntionSolidConnection(props: any) {

	const solidPodAddress = async () => {
		let profileDocumentURI = props.split("#")[0]; // we are just interested in the card
		console.log(profileDocumentURI);
		let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
		console.log(myDataset);
		let profile = getThing(myDataset, props); // we obtain the thing we are looking for from the dataset
        console.log(profile);
		// we obtain the property we are looking for and return it
		return getStringNoLocale(profile as Thing, VCARD.street_address) as string;
	};

	return solidPodAddress;
}