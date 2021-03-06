import { SendOutlined, MailOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UrlContext } from "../..";
import { MessageWithId } from "../../models/Message";
import { Emails } from "./emails-display/Emails";
import { RefreshContext, SearchContext } from "./EmailsView";

const { TabPane } = Tabs;
interface Inbox {
  sent: MessageWithId[];
  received: MessageWithId[];
}

export const EmailViewLayout = () => {
  const [sent, setSent] = useState<MessageWithId[]>([]);
  const [received, setReceived] = useState<MessageWithId[]>([]);
  const [refresh, toggleRefresh] = useContext(RefreshContext)!;
  const [searched, setSearched] = useContext(SearchContext)!;

  const baseUrl = useContext(UrlContext);

  const fetchMessages = async () => {
    if (searched !== "") {
      try {
        const inbox = await axios.get<Inbox>(
          `${baseUrl}/messages/${searched}/getAll`
        );
        setSent(inbox.data.sent);
        setReceived(inbox.data.received);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSent([]);
      setReceived([]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [refresh, searched]);

  return (
    <Tabs centered defaultActiveKey="inbox">
      <TabPane
        tab={
          <span>
            <MailOutlined />
            INBOX
          </span>
        }
        key="inbox"
      >
        <Emails emails={received} isInbox={true} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <SendOutlined />
            SENT
          </span>
        }
        key="sent"
      >
        <Emails emails={sent} isInbox={false} />
      </TabPane>
    </Tabs>
  );
};
