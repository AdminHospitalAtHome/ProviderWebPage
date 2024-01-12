import {StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {AzureCommunicationTokenCredential} from '@azure/communication-common';

const endpointurl =
  'https://hospitalathomechat.unitedstates.communication.azure.com';


import {
  getAllMessages,
  getChatThread,
  getCommunicationId,
  getCommunicationToken,
  initChatClient, initChatThreadClient,
  sendMessage, temp_communicationId,
} from '../BackendFunctions/Chat/Message'
import React, {useCallback, useEffect, useState} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';


export default function TabOneScreen() {
  // Temporary until we get the provider one set up
  const providerUserID = 200000001
  const [chatClient, setChatClient] = useState<ChatClient | undefined>(undefined);
  const [chatThreadClient, setChatThreadClient] = useState<ChatThreadClient | undefined>(undefined)
  const [chatMessages, setChatMessages] = useState<any[]>([]) // TODO: Change to specific type later....

  useEffect(() => {
    console.log("RUN")
    initChatClient(providerUserID).then(res => {
      setChatClient(res)
    });
  }, []);

  useEffect(() => {
    if (chatClient) {
      initChatThreadClient(chatClient).then(res => {
        setChatThreadClient(res)
        if (res) {
          console.log('created chat thread client')
        } else {
          console.log('issue')
        }
      });
    }
  }, [chatClient]);

  useEffect(() => {
    if (chatThreadClient) {
      getAllMessages(chatThreadClient).then((res) => {
        setChatMessages(res);
        console.log(res);
        console.log(temp_communicationId)
      })
    }
  }, [chatThreadClient])
  if (chatThreadClient) {
    return (
        <GiftedChat
          messages={chatMessages}
          onSend={(messages) => {sendMessage(chatThreadClient, messages, setChatMessages)}}
          user={
            {_id: temp_communicationId}
          }
          showAvatarForEveryMessage={true}
        />
    )
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }


}

const styles
  =
  StyleSheet.create
  ({
    container:
      {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
    ,
    title:
      {
        fontSize: 20,
        fontWeight: 'bold',
      }
    ,
    separator:
      {
        marginVertical: 30,
        height: 1,
        width: '80%',
      }
    ,
  });
