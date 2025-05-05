import { Injectable } from '@nestjs/common';
import { UpdateAiDto } from './dto/update-ai.dto';
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class AiService {
  private chathestory = new Map<string, { sender: string; message: any }[]>();

  private genAI = new GoogleGenAI({apiKey: 'AIzaSyBe7WfAs84desvy_rTZLXXLaL78BnRxgrw'});

  async  create(createAiDto: any ,userId: string) {
   const { message} = createAiDto;
    const chatHistory = this.chathestory.get(userId) || [];
    chatHistory.push({sender:"user", message});

   
    const response = await this.genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents:message,
    });
    chatHistory.push({sender:"ai", message:response.text});
    this.chathestory.set(userId, chatHistory);
  console.log("chatHistory", this.chathestory);
  
    return response.text;
  }

  getAllMessages(userId: string) {
    const chatHistory = this.chathestory.get(userId) || [];
    return chatHistory.map((message) => {
      return { sender: message.sender, message: message.message };
    }
    );
  }
   

  findOne(id: number) {
    return `This action returns a #${id} ai`;
  }

  update(id: number, updateAiDto: UpdateAiDto) {
    return `This action updates a #${id} ai`;
  }

  remove(id: number) {
    return `This action removes a #${id} ai`;
  }
}
