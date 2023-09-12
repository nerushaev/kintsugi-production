import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { novaInstance, NOVA_API_KEY } from "../../../../API/nova";
import { theme } from "../../../../styles/theme";

const StatusWrapper = styled.div``;

const StatusText = styled.p`
  font-size: ${theme.fontSizes.small};
`;

export default function OrderStatusBar({ documentRef, userPhone }) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data } = await novaInstance.post(
          "https://api.novaposhta.ua/v2.0/json/",
          {
            apiKey: NOVA_API_KEY,
            modelName: "TrackingDocument",
            calledMethod: "getStatusDocuments",
            methodProperties: {
              Documents: [
                {
                  DocumentNumber: documentRef,
                  Phone: userPhone,
                },
              ],
            },
          }
        );
        return setStatus(data.data[0].Status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatus();
  }, [documentRef, userPhone]);

  return (
    <StatusWrapper>
      <StatusText>{status}</StatusText>
    </StatusWrapper>
  );
}
