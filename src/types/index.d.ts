// 手动声明 ElMessage
declare module 'element-plus' {
  export class ElMessage {
    static success(message: string): void;
    static warning(message: string): void;
    static info(message: string): void;
    static error(message: string): void;
  }
}

declare module 'swiper';

type BlogType = {
  title: string;
  subTitle: string;
  category: string;
  image: {
    name: string;
    url: string;
  };
  isOriginal: boolean;
  like: number;
  see: number;
  tags: string[];
  publishTime: number;
  updateTime: number;
  htmlContent?: string;
  markdownContent?: string;
  comments?: Comments[];
  _id: string;
};

// 评论数据
type Comments = {
  id?: string;
  arthur: string;
  date?: number;
  content: string;
  email?: string;
  reply?: Reply[];
  isHide?: boolean;
};

type Reply = Comments & {
  parentId?: string;
  replyName?: string;
  replyEmail?: string;
  replyContent?: string;
};
