import React, {lazy, Suspense} from 'react';

import {useHideModal, useModal} from '../../../providers/ModalProvider';
import {
  DynamicIcon,
  Loading,
  LoadingSize,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from '../index';
import {ModalText} from './ModalText/ModalText';

export const ModalWrapper = () => {
  const modal = useModal();
  const handleOnClose = useHideModal();

  const {header, body, footer} = modal;

  const getComponents = components => {
    return components
      ? components.map(c => ({
          component: lazy(() => import(`../../${c.path}`)),
          props: c.props
        }))
      : [];
  };

  const renderComponents = components => {
    return components.map((c, i) => <c.component key={i} {...c.props} />);
  };

  const headerComponents = getComponents(header.components);
  const bodyComponents = getComponents(body.components);
  const footerComponents = getComponents(footer.components);

  return (
    <Modal show={modal.show} size={modal.size} type={modal.type}>
      <ModalHeader type={modal.type}>
        <Suspense fallback={<Loading size={LoadingSize.LARGE} />}>
          {headerComponents.length ? renderComponents(headerComponents) : <div />}
        </Suspense>
        {header.title && (
          <ModalTitle>
            {header.icon && <DynamicIcon path={header.icon} size={50} />}
            {header.title}
          </ModalTitle>
        )}
      </ModalHeader>
      <ModalBody type={modal.type}>
        <Suspense fallback={<Loading size={LoadingSize.LARGE} />}>
          {bodyComponents.length > 0 ? (
            renderComponents(bodyComponents)
          ) : (
            <ModalText>{body.text}</ModalText>
          )}
        </Suspense>
      </ModalBody>
      {footer.withButtons && (
        <ModalFooter type={modal.type} onClose={handleOnClose}>
          <Suspense fallback={<Loading size={LoadingSize.LARGE} />}>
            {footerComponents.length > 0 && renderComponents(footerComponents)}
          </Suspense>
        </ModalFooter>
      )}
    </Modal>
  );
};
