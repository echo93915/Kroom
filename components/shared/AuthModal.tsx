import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { Mail } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인 또는 회원 가입</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Kroom에 오신 것을 환영합니다.</h2>
          <div className="mt-4 border rounded-lg">
            <div className="p-4 border-b">
              <Select defaultValue="us">
                <SelectTrigger>
                  <SelectValue placeholder="국가/지역" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">미국 (+1)</SelectItem>
                  <SelectItem value="kr">대한민국 (+82)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4">
              <Input type="tel" placeholder="전화번호" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터 요금이 부과됩니다. 개인정보 처리방침
          </p>
          <Button className="w-full mt-4 bg-red-500 hover:bg-red-600">계속</Button>
          <div className="flex items-center my-4">
            <Separator className="flex-grow" />
            <span className="mx-4 text-xs text-gray-500">또는</span>
            <Separator className="flex-grow" />
          </div>
          <div className="space-y-2">
            <SocialButton icon={SiNaver} text="네이버로 로그인하기" />
            <SocialButton icon={FaGoogle} text="구글로 로그인하기" />
            <SocialButton icon={FaApple} text="애플로 로그인하기" />
            <SocialButton icon={Mail} text="이메일로 로그인하기" />
            <SocialButton icon={FaFacebook} text="페이스북으로 로그인하기" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SocialButton = ({ icon: Icon, text }: { icon: any; text: string }) => {
  return (
    <Button variant="outline" className="w-full justify-start">
      <Icon className="mr-4 h-5 w-5" />
      {text}
    </Button>
  );
};

export default AuthModal; 