/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPFI } from '@pnp/sp';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IFAQ } from '../../../interfaces';
import { getSP } from '../../../pnpjsConfig';
// import styles from './Faq.module.scss';
import { IFaqProps } from './IFaqProps';
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

const Faq = (props: IFaqProps) => {

  // setup loading data
  const LOG_SOURCE: string = 'Faq WebPart';
  const LIST_NAME: string = 'FAQ';
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = useState<IFAQ[]>([]);

  const getFAQItems = async () => {
    // Get items information from SharePoint
    console.log("Context:", _sp);
    const items = _sp.web.lists.getById(props.listGuild).items.select().orderBy('Letter', true).orderBy('Title', true);
    // const items = _sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('Letter', true).orderBy('Title', true);
    //  with the orderBy('Letter', true) and orderBy('Title', true) the items are sorted by Letter and then by Title
    console.log("FAQ Items:", items);

    const FakeData = [
      {
        Id: 1,
        Title: "Example Title 1",
        Body: "Example Body 1",
        Letter: "A"
      },
      {
        Id: 2,
        Title: "Example Title 2",
        Body: "Example Body 2",
        Letter: "B"
      },
      {
        Id: 3,
        Title: "Example Title 3",
        Body: "Example Body 3",
        Letter: "C"
      },
      {
        Id: 4,
        Title: "Example Title 4",
        Body: "Example Body 4",
        Letter: "D"
      },
      {
        Id: 5,
        Title: "Example Title 5",
        Body: "Example Body 5",
        Letter: "E"
      },
      {
        Id: 6,
        Title: "Example Title 6",
        Body: "Example Body 6",
        Letter: "F"
      },
      {
        Id: 7,
        Title: "Example Title 7",
        Body: "Example Body 7",
        Letter: "G"
      },
      {
        Id: 8,
        Title: "Example Title 8",
        Body: "Example Body 8",
        Letter: "H"
      },
      {
        Id: 9,
        Title: "Example Title 9",
        Body: "Example Body 9",
        Letter: "I"
      },
      {
        Id: 10,
        Title: "Example Title 10",
        Body: "Example Body 10",
        Letter: "J"
      }
    ];

    setFaqItems((await FakeData).map((item: any) => {
      return {
        Id: item.Id,
        Title: item.Title,
        Body: item.Body,
        Letter: item.Letter,
      };
    }));
  };

  useEffect(() => {
    if (props.listGuild && props.listGuild !== '') {
      getFAQItems();
    }
  }, [props]);

  return (
    <>
      <h1>Hello World!</h1>
      <pre>
        {JSON.stringify(faqItems, null, 2)}
      </pre>
      <div>
        <WebPartTitle displayMode={props.displayMode}
          title={props.title}
          updateProperty={props.updateProperty} />
      </div>
      {
        props.listGuild ?
          faqItems.map((item: IFAQ, index: number) => (
            <Accordion
              title={item.Title}
              defaultCollapsed={true}
              key={index}
              className={"itemCell"}
            >
              <div className={"itemContent"}>
                <h3 className={"itemLetter"}>{item.Letter}</h3>
                <p className={"itemBody"}>{item.Body}</p>
              </div>
            </Accordion>
          )) :
          <Placeholder iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={
              () => props.context.propertyPane.open()
            }
          />
      }
    </>
  );
};

export default Faq;