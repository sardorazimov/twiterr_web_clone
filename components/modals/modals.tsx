import { ReactElement } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { X } from "lucide-react";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    body?: ReactElement;
    isStep?: boolean;
    step?: number;
    totalSteps?: number;
    footer?: ReactElement
}

const Modals = ({
    isOpen,
    onClose,
    title,
    body,
    isStep,
    step,
    totalSteps,
    footer
}: ModalProps) => {
return(

    <div>
 <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent>
    <DialogHeader> 
      {/* <div className="flex items-center gap-6">
          <button className="p-1 border-0 text-white hover:opacity-70 transition w-fit" >
        <X size={22}  onClick={onClose}/>
      </button> 
      </div>*/}
      {step && totalSteps && (
        <div className="text-xl font-bold">Step  {step} of {totalSteps} </div>
      )}
      
    </DialogHeader>
    <div className="mt-4">{body}</div>
    {footer && <div className="mt-4">{footer}</div>}
  </DialogContent>
</Dialog>

    </div>
)
}

export default Modals
