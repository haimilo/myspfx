/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPFI } from '@pnp/sp';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IFAQ } from '../../../interfaces';
import { getSP } from '../../../pnpjsConfig';
// import styles from './Faq.module.scss';
import { IFaqProps } from './IFaqProps';

const Faq = (props: IFaqProps) => {

  // setup loading data
  const LOG_SOURCE: string = 'Faq WebPart';
  const LIST_NAME: string = 'FAQ';
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = useState<IFAQ[]>([]);

  const getFAQItems = async () => {
    // Get items information from SharePoint
    console.log("Context:", _sp);
    // try {
    //   const response: any = await _sp.web.lists
    //     .getByTitle(LIST_NAME)
    //     .getItems();
    //   const items = response.getEnumerator();

    //   while (items.moveNext()) {
    //     const item = items.get_current();
    //     console.log("Item:", item);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    const items = _sp.web.lists.getByTitle(LIST_NAME).items;
    console.log("FAQ Items:", items);
  };

  useEffect(() => {
    getFAQItems().catch(error => console.error(error));
  }, []);


  return (
    <h1>
      Hello World!
    </h1>
  );
};

export default Faq;