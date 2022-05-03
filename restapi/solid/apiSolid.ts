import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getUrlAll,
  Thing
} from "@inrupt/solid-client";
import { VCARD } from "@inrupt/vocab-common-rdf";
import express, { Request, Response, Router } from 'express';

const apiSolid: Router = express.Router()

async function getProfile(webId: string): Promise<Thing> {
  let profileDocumentURI = webId.split("#")[0];
  let myDataset = await getSolidDataset(profileDocumentURI);
  return getThing(myDataset, webId) as Thing;
}

apiSolid.get(
  "/solidUser/webId=:webId",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let addressURLs = await getUrlAll(await getProfile('https://' + req.params.webId.toLowerCase() + '/profile/card#me'), VCARD.hasAddress);
      let addresses: string[] = [];
  

     for (let addressURL of addressURLs) {
      let address = getStringNoLocale(
        await getProfile(addressURL),
        VCARD.street_address
      );
      let locality = getStringNoLocale(
        await getProfile(addressURL),
        VCARD.locality
      );
      let region = getStringNoLocale(await getProfile(addressURL), VCARD.region);
      let postal_code = getStringNoLocale(
        await getProfile(addressURL),
        VCARD.postal_code
      );

      let country = getStringNoLocale(
       await getProfile(addressURL),
        VCARD.country_name
      );

      if (address)
        addresses.push(`${address};${locality};${region};${country};${postal_code}`);
    }
    return res.status(200).send(addresses);
    } catch(Error){
    return res.sendStatus(500);
  }
});

export default apiSolid;
