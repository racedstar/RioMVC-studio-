//------------------------------------------------------------------------------
// <auto-generated>
//     這個程式碼是由範本產生。
//
//     對這個檔案進行手動變更可能導致您的應用程式產生未預期的行為。
//     如果重新產生程式碼，將會覆寫對這個檔案的手動變更。
// </auto-generated>
//------------------------------------------------------------------------------

namespace RioManager.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Vw_AlbumJoinPic
    {
        public Nullable<int> PicSN { get; set; }
        public string PicName { get; set; }
        public string PicContent { get; set; }
        public string PicPath { get; set; }
        public Nullable<int> PicHitCount { get; set; }
        public Nullable<bool> PicIsEnable { get; set; }
        public Nullable<bool> PicIsDelete { get; set; }
        public string PicCreateID { get; set; }
        public string PicCreateName { get; set; }
        public Nullable<System.DateTime> PicCreateDate { get; set; }
        public string PicModifyID { get; set; }
        public string PicModifyName { get; set; }
        public Nullable<System.DateTime> PicModifyDate { get; set; }
        public Nullable<int> AlbumSN { get; set; }
        public string AlbumName { get; set; }
        public string AlbumContent { get; set; }
        public Nullable<int> FrontCoverSN { get; set; }
        public Nullable<int> AlbumHitCount { get; set; }
        public Nullable<bool> AlbumIsEnable { get; set; }
        public Nullable<bool> AlbumIsDelete { get; set; }
        public string AlbumCreateID { get; set; }
        public string AlbumCreateName { get; set; }
        public Nullable<System.DateTime> AlbumCreateDate { get; set; }
        public string AlbumModifyID { get; set; }
        public string AlbumModifyName { get; set; }
        public Nullable<System.DateTime> AlbumModifyDate { get; set; }
        public int JoinSN { get; set; }
        public int JoinSort { get; set; }
    }
}
