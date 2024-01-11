import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import {
  getChatThread,
  getCommunicationId,
  getCommunicationToken,
  getMessage,
  sendMessage,
} from '../BackendFunctions/Chat/Message'
import React, {useCallback, useEffect, useState} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';


export default function TabOneScreen() {
  const [accessToken, setAccessToken] = useState('');
  const [communicationId, setCommunicationId] = useState('');
  const [chatThreadId, setChatThreadId] = useState('');
  const [chatMessage, setChatMessage] = useState<any[]>([]);
  const [giftedChatMessages, setGiftedChatMessages] = useState<any[]>([]);

  useEffect(() => {
    getCommunicationId(200000001)
      .then(res => {
        setCommunicationId(res);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (communicationId) {
      getCommunicationToken(communicationId)
        .then(res => {
          setAccessToken(res);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [communicationId]);

  useEffect(() => {
    if (accessToken && communicationId) {
      getChatThread(communicationId)
        .then(res => {
          setChatThreadId(res);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [accessToken, communicationId]);

  useEffect(() => {
    if (chatThreadId && accessToken) {
      getMessage(chatThreadId, accessToken).then(res => {
        let parsedMsg = [];

        for (let i = 0; i < res.value.length; i++) {
          if (!res.value[i].content.message) {
            continue;
          }
          let dic = {
            _id: res.value[i].id,
            text: res.value[i].content.message,
            createdAt: res.value[i].createdOn,
            user: {
              _id: res.value[i].senderCommunicationIdentifier.communicationUser
                .id,
              name: 'Patient',
              avatar:
                'https://pbs.twimg.com/profile_images/1276003977910517761/SOFf-4mY_400x400.jpg',
            },
          };
          parsedMsg.push(dic);
        }
        setChatMessage(res.value);
        setGiftedChatMessages(parsedMsg);
      });
    }
  }, [chatThreadId, accessToken]);

  const onSend = useCallback(
    (messages:any[] = []) => {
      if (chatThreadId && accessToken) {
        sendMessage(chatThreadId, accessToken, messages[0].text);
        setGiftedChatMessages((previousMessages: any) =>
          GiftedChat.append(previousMessages, messages),
        );
      }
    },
    [chatThreadId, accessToken],
  );

  const renderBubble = (props: React.JSX.Element) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#e6dfdf',
          },
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={giftedChatMessages}
      onSend={giftedChatMessages => onSend(giftedChatMessages)}
      user={{
        _id: communicationId,
      }}
      textInputStyle={{color: 'black'}}
      renderBubble={renderBubble}
      showAvatarForEveryMessage={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
