import { observer } from "mobx-react";
import { useLayoutEffect } from "react";

import { ContentContainer } from "@/components/ContentContainer";
import { useStores } from "@/hooks";
import { AdministrationActions } from "@/modules/AdministrationModule/AdministrationActions.tsx";
import { AdministrationContent } from "@/modules/AdministrationModule/AdministrationContent.tsx";
export const AdministrationModule = observer(() => {
    const {
        rootStore: {
            administrationStore: {
                mount,
                unmount
            }
        }
    } = useStores();

    useLayoutEffect(() => {
        mount();
        return () => {
            unmount();
        };
    }, [mount, unmount]);

    return (
        <ContentContainer
            actions={<AdministrationActions/>}
        >
            <AdministrationContent/>
        </ContentContainer>
    );
});