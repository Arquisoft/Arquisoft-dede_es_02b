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
		let profileDocumentURI = props.split("#")[0];
		console.log(profileDocumentURI);
		let myDataset = await getSolidDataset(profileDocumentURI);
		console.log(myDataset);
		let profile = getThing(myDataset, props); 
		return getStringNoLocale(profile as Thing, VCARD.street_address) as string;
	};

	return solidPodAddress;
}
