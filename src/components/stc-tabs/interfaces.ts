export interface IStcTabData {
    select: () => void;
    unselect: () => void;
    name: string;
}

export interface IStcTabHeaderData extends IStcTabData {
    id: string;
}

export interface IStcTabContentData extends IStcTabData { }

export interface StcTabs {
    tabsHeader: IStcTabHeaderData[];
    tabsContent: IStcTabContentData[];
    tabGroup: any;
}
