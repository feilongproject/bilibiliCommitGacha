import ""


declare global {

    namespace BilibiliReply {
        interface Root {
            data: Data;
        }

        interface Data {
            cursor: Cursor;
            replies: Reply[];
        }

        interface Cursor {
            is_begin: boolean;
            is_end: boolean;
            prev: number;
            next: number;
            mode: number;
            mode_text: string;
            all_count: string;
            support_mode: number[];
            name: string;
            pagination_reply: {
                next_offset?: string;
                prev_offset?: string;
            };
        }

        interface Reply {
            rpid: number;
            oid: number;
            type: number;
            mid: number;
            root: number;
            parent: number;
            dialog: number;
            count: number;
            rcount: number;
            state: number;
            fansgrade: number;
            attr: number;
            ctime: number;
            rpid_str: string;
            root_str: string;
            parent_str: string;
            like: number;
            // action: number;
            member: {
                mid: string;
                uname: string;
                sex: string;
                sign: string;
                avatar: string;
                rank: string;
                face_nft_new: number;
                is_senior_member: number;
                senior: {};
                level_info: {
                    current_level: number;
                    current_min: number;
                    current_exp: number;
                    next_exp: number;
                };
                pendant: {
                    pid: number;
                    name: string;
                    image: string;
                    expire: number;
                    image_enhance: string;
                    image_enhance_frame: string;
                };
                nameplate: {
                    nid: number;
                    name: string;
                    image: string;
                    image_small: string;
                    level: string;
                    condition: string;
                };
                official_verify: {
                    type: number;
                    desc: string;
                };
                vip: {
                    vipType: number;
                    vipDueDate: number;
                    dueRemark: string;
                    accessStatus: number;
                    vipStatus: number;
                    vipStatusWarn: string;
                    themeType: number;
                    label: {
                        path: string;
                        text: string;
                        label_theme: string;
                        text_color: string;
                        bg_style: number;
                        bg_color: string;
                        border_color: string;
                        use_img_label: boolean;
                        img_label_uri_hans: string;
                        img_label_uri_hant: string;
                        img_label_uri_hans_static: string;
                        img_label_uri_hant_static: string;
                    };
                    avatar_subscript: number;
                    nickname_color: string;
                };
                fans_detail: any;
                user_sailing: {
                    pendant: any;
                    cardbg: any;
                    cardbg_with_focus: any;
                };
                is_contractor: boolean;
                contract_desc: string;
            };
            // content: Content;
            // replies: any;
            // assist: number;
            // up_action: UpAction;
            // invisible: boolean;
            // reply_control: ReplyControl;
            // folder: Folder;
            // dynamic_id_str: string;
        }

    }
}
