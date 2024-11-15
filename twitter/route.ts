"use server"

import { NextRequest } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

export async function POST(req: NextRequest) {

    const responseBody = await req.json()

    console.log(responseBody.consumerKey)
    console.log(responseBody.parsedContent.body)

    const twitterClient = new TwitterApi({
        appKey: responseBody.consumerKey,       // Your Consumer Key
        appSecret: responseBody.consumerSecret, // Your Consumer Secret
        accessToken: responseBody.accessToken,  // Your Access Token
        accessSecret: responseBody.tokenSecret,// Your Access Secret
    });

      const user = await twitterClient.v2.me();
      console.log(user);
  
        try {
          const postTweet = await twitterClient.v2.tweet(responseBody.parsedContent.body);
          
          console.log("received response from postTweet: ", postTweet);
          console.dir(postTweet)
          return new Response(JSON.stringify(postTweet), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.log("Error creating tweet: ", error)
          return new Response(JSON.stringify( { error: error, body: "Error" } ))
        }
}
