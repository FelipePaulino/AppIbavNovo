import React from "react";
import Modal from "react-native-modal";

import { IContentProps } from "./types";

export function ModalComponent({
  isVisible,
  onBackdropPress,
  children,
  teste
}: IContentProps) {
  isVisible && console.log(teste ? teste : "não")
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      {children}
    </Modal>
  );
}
