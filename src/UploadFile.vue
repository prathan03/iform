<style scope>
    .custom-file-label {
        height: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
<template>
    <div>
        <div class="input-group input-group-sm p-0">
            <div class="custom-file p-0 mt-1 col-10" @click="$refs[iKey].click()">
                <input :name="iKey" type="file" v-validate="getiRequire()"
                    :class="{'form-control-file':true,'custom-file-input':true,'form-control-sm':true,'is-invalid': errors.first(this.iKey) ,'is-valid': txtFile }"
                    :ref="iKey" v-on:change="handleFileUpload()" style="display:none" :accept="iAccept"
                    :disabled="readonly" />
                <label class="custom-file-label pt-1 pl-2" style="text-align:left;">{{txtFile}}</label>
                <span v-show="errors.first(this.iKey)" class="invalid-feedback"
                    style="margin-top: 50px;">{{ errors.first(this.iKey) }}</span>
            </div>
            <div class="col-2">
                <button class="btn btn-primary" @click="PreviewFile()" :v-if="isPreview" data-toggle="modal"
                    data-target="#PreviewModal">ดูตัวอย่าง</button>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="PreviewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <VuePDFViewer v-if="typeFile=='pdf'&& isShow" :url="apiPathPdf" height="550px" />
                        <img v-if="typeFile=='img' && isShow" height="550px" width="100%" :src="apiShowImage + path">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {
        mapActions
    } from "vuex";
    import VuePDFViewer from 'vue-instant-pdf-viewer';
    import {
        iLoadingJS
    } from "iform-zt";
    export default {
        props: ["iStore", "iKey", "iRequire", "iShow", "iPK", "iAccept", "iPreview", "iApiImg", "iReadonly"],
        components: {
            VuePDFViewer
        },
        data() {
            return {
                file: "",
                path: "",
                statusUpload: true,
                imgShow: false,
                imgPath: siteapi + "/images/NO_IMG.png",
                typeFile: null,
                isPreview: null,
                isShow: false,
                apiPathPdf: null,
                old_path_file: null,
                apiShowImage: "/api/image/",
                readonly: false,
            };
        },
        inject: ["$validator"],
        mounted() {
            this.checkPropsiReadonly();
            if (this.Obj[this.iKey] !== "") {
                this.txt = this.Obj[this.iKey];
            }
            if (this.iShow) {
                this.imgShow = true;
            } else {
                this.imgShow = false;
            }
            this.isPreview = this.iPreview
            var url = window.location.href
            var arr = url.split("/");
            this.sitePage = arr[0] + "//" + arr[2]
            this.setPropsiApiImg();
        },
        computed: {
            Obj: {
                get() {
                    return this.$store.getters[`${this.iStore}/getObj`];
                }
            },
            txtFile: {
                get() {
                    if (this.statusUpload) {
                        this.path = this.Obj[this.iKey];
                    }

                    return this.Obj[this.iKey];
                },
                set(val) {
                    this.updateObjByKey({
                        key: this.iKey,
                        data: val
                    });
                }
            }
        },
        methods: {
            checkPropsiReadonly() {
                if (this.iReadonly == "readonly" || this.iReadonly == "disabled" || this.iReadonly == true) {
                    this.readonly = true;
                } else {
                    this.readonly = false;
                }
            },
            setPropsiApiImg() {
                if (this.iApiImg != undefined && this.iApiImg != "undefined" && this.iApiImg != "") {
                    this.apiShowImage = this.iApiImg;
                }
            },
            PreviewFile() {
                if (this.typeFile == 'pdf') {
                    var res = this.path.split("/");
                    this.apiPathPdf = '/api/file/view/' + res[1]
                }
                this.isShow = true
            },
            getiRequire() {
                // console.log("getiRequire");
                if (this.txtFile) {
                    // console.log("have");
                    return this.iRequire.toString();
                } else {
                    // console.log("not have");
                    return this.iRequire.toString();
                }
            },
            getFile() {
                const selfe = this;
                if (!this.path) {
                    this.$swal({
                        position: "center",
                        type: "warning",
                        title: "กรุณทำการบันทึกฟอร์ม ก่อนกดดาวน์โหลด"
                    });
                } else {
                    var id = "";
                    if (this.iPK) {
                        id = this.iPK;
                    } else {
                        id = this.$route.params.id;
                    }
                    var store = "";
                    var str = selfe.iStore.slice(-1);
                    if (str == "s" || str == "S") {
                        store = selfe.iStore + "es";
                    } else {
                        store = selfe.iStore + "s";
                    }
                    axios
                        .get(siteapi + "/api/file/download/" + store + "/" + this.iKey + "/" + id, {
                            responseType: "blob"
                        })
                        .then(response => {
                            if ((response.status = 200)) {
                                const url = window.URL.createObjectURL(new Blob([response.data]));
                                const link = document.createElement("a");
                                link.href = url;
                                var array = selfe.path.split("/");
                                link.setAttribute("download", array[1]);
                                document.body.appendChild(link);
                                link.click();
                            } else if ((response.status = 404)) {
                                this.$swal({
                                    position: "center",
                                    type: "error",
                                    title: "กรุณาทำการบันทึกฟอร์ม ก่อนกดดาวน์โหลด",
                                    showConfirmButton: false
                                });
                            } else {
                                this.$swal({
                                    position: "center",
                                    type: "error",
                                    title: "เกิดข้อผิดพลาด",
                                    showConfirmButton: false
                                });
                            }
                        });
                }
            },
            uploadFile() {
                if (!this.file) {
                    this.$swal({
                        position: "center",
                        type: "error",
                        title: "กรุณาเลือกไฟล์ก่อนทำการอัพโหลด",
                        showConfirmButton: false
                    });
                } else {
                    this.$validator.validate(this.iKey).then((result) => {
                        if (result) {
                            const loaded = iLoadingJS.animationLoad.startLoad();
                            let formData = new FormData();
                            const selfe = this;
                            formData.append("file", this.file);
                            axios.post(siteapi + "/api/file/upload", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then(function (res) {
                                console.log("SUCCESS!!");
                                iLoadingJS.animationLoad.endLoad(loaded);
                                selfe.$swal({
                                    position: "center",
                                    type: "success",
                                    title: "อัพโหลดไฟล์เรียบร้อย",
                                    showConfirmButton: false,
                                    timer: 1800
                                });
                                selfe.txtFile = res.data.path;
                                selfe.path = res.data.path;
                                selfe.updateNewPathFileByCondition();
                            }).catch(function () {
                                console.log("FAILURE!!");
                                iLoadingJS.animationLoad.endLoad(loaded);
                            });
                        }
                    })
                }
            },
            updateNewPathFileByCondition() {
                var selfe = this;
                console.log("log_selfe", selfe);
                if (selfe.old_path_file) {

                    var store = "";
                    var str = selfe.iStore.slice(-1);
                    if (str == "s" || str == "S") {
                        store = selfe.iStore + "es";
                    } else {
                        store = selfe.iStore + "s";
                    }
                    var obj = {
                        db: store,
                        key: selfe.iKey,
                        path_old_file: selfe.old_path_file,
                        path_new_file: selfe.path
                    };

                    axios.post(siteapi + "/api/file/updatePathFile", obj).then(res_update => {
                        console.log("res_update", res_update);
                    }, error_update => {
                        console.log("error_update", error_update);

                    });
                }
            },
            deleteFile(cb, path_old_file) {
                console.log("path_old_file", path_old_file);
                const selfe = this;
                console.log("selfeselfeselfeselfe", selfe);
                this.$swal({
                    title: "คุณแน่ใจหรือว่าต้องการลบไฟล์นี้?",
                    text: "กรุณาตรวจสอบและตัดสินใจ จากนั้นกดตกลง",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ตกลง",
                    cancelButtonText: "ยกเลิก"
                }).then(result => {
                    if (result.value) {
                        // const loaded = iLoadingJS.animationLoad.startLoad();
                        var id = "";
                        if (this.iPK) {
                            id = this.iPK;
                        } else {
                            id = this.$route.params.id;
                        }
                        var store = "";
                        var str = selfe.iStore.slice(-1);
                        if (str == "s" || str == "S") {
                            store = selfe.iStore + "es";
                        } else {
                            store = selfe.iStore + "s";
                        }
                        var obj = {
                            db: store,
                            key: selfe.iKey,
                            path_old_file: path_old_file,
                            path_new_file: selfe.path
                        };

                        axios.post(siteapi + "/api/file/deleteFileByCondition", obj).then(response => {
                            console.log("response", response);
                            selfe.old_path_file = obj.path_old_file;
                            selfe.file = null;
                            selfe.txtFile = "";
                            selfe.path = "";
                            cb();
                        }, error_delete => {
                            console.log("error_delete", error_delete);
                        });
                        // axios.delete(siteapi + "/api/file/delete/" + store + "/" + selfe.iKey + "/" + id).then(
                        //     response => {
                        //         iLoadingJS.animationLoad.endLoad(loaded);
                        //         if ((response.status = 204)) {
                        //             selfe.file = null;
                        //             selfe.txtFile = "";
                        //             selfe.path = "";
                        //             cb();
                        //         }
                        //     }, error_delete => {
                        //         iLoadingJS.animationLoad.endLoad(loaded);
                        //     });
                    }
                });
            },
            handleFileUpload() {
                console.log("this.file", this.file);
                if (this.$refs[this.iKey].files[0]) {
                    console.log("this.$refs[this.iKey].files[0]", this.$refs[this.iKey].files[0]);
                    this.$validator.validate(this.iKey).then((result) => {
                        console.log("validate", result);
                        if (result) {
                            this.statusUpload = false;
                            const selfe = this;
                            if (!this.path) {
                                this.file = this.$refs[this.iKey].files[0];

                                if (this.file) {
                                    this.txtFile = this.file.name;
                                    this.path = "";
                                    this.uploadFile();
                                } else {
                                    selfe.txtFile = "";
                                }
                            } else {
                                console.log("this.paththis.paththis.paththis.path", this.path);

                                let requests = [1].map(item => {
                                    return new Promise(resolve => {
                                        selfe.deleteFile(resolve, this.path);
                                    });
                                });

                                Promise.all(requests).then(() => {
                                    selfe.file = selfe.$refs[selfe.iKey].files[0];
                                    selfe.txtFile = selfe.file.name;
                                    selfe.path = "";

                                    if (!selfe.errors.has(this.iKey)) {
                                        selfe.uploadFile();
                                    }
                                });
                            }
                        }
                    })
                }

            },
            updateObjByKey(payload) {
                this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload);
            },
            setBindingDisable(value_readonly) {
                if (value_readonly) {
                    if (value_readonly == "readonly" || value_readonly == "disabled" || value_readonly == true) {
                        this.readonly = true;
                    } else {
                        this.readonly = false;
                    }
                } else {
                    this.readonly = false;
                }
            },
        },
        watch: {
            path(data) {
                if (data) {
                    var res = data.split(".");

                    if (res[1] == 'pdf') {
                        this.typeFile = 'pdf'
                    } else if (res[1] == 'jpeg' || res[1] == 'jpg' || res[1] == 'png' || res[1] == 'gif') {
                        this.typeFile = 'img'
                    } else {
                        this.typeFile = res[1];
                        this.isPreview = false
                    }
                }
            },
            iReadonly: function (value_readonly) {
                this.setBindingDisable(value_readonly);
            },
        },
    };

</script>
