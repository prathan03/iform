<template>
  <div class="mt-3" v-if="!isError">
    <div class="wrapper col-lg-6 col-sm-12 col-12">
      <div class="title">
        <div class="line"></div>การอนุมัติ
      </div>
      <div class="card mt-3">
        <div class="card-body">
          <div class="row">
            <button
              v-for="item in states"
              :key="item.id"
              type="button"
              class="btn btn-info mr-2"
              v-on:click="nextState(item)"
            >
              <i class="fas fa-plus-square"></i>
              {{ item.line_name }}
            </button>
          </div>
          <div class="row mt-2">
            <textarea class="form-control" v-model="txt" rows="3" cols="3"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import guid from "uuid/v1";
export default {
  props: ["workcode", "request_id"],
  data() {
    return {
      txt: "",
      isError: true,
      states: null,
      user: null
    };
  },
  mounted() {
    this.getState();
    axios.get(siteapi + "/api/userLogInWorkFlowTaskHistory").then(
      response => {
        this.user = response.data;
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    getState() {
      const self = this;
      axios
        .get(
          "/api/RelationWorkFlow/getStateForApprove/" +
            this.workcode +
            "/" +
            this.request_id
        )
        .then(function(response) {          
          if (response.data !== "error") {
            self.isError = false;
            self.states = response.data;
          }else if(response.data == "error"){
            self.isError = true;
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    nextState(item) {
      this.$swal({
        title: "คุณแน่ใจหรือว่าต้องตัวเลือกนี้?",
        text: "กรุณาตรวจสอบและตัดสินใจ จากนั้นกดยืนยัน",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก"
      }).then(result => {
        if (result.value) {
          if (item.actoin_api) {
            var url = item.actoin_api.replace("{id}", item.table_id);
            axios
              .get(url)
              .then(response => {
                this.$swal({
                  title: "ดำเนินการสำเร็จ",
                  text: "",
                  type: "success",
                  showConfirmButton: false,
                  timer: 2000
                }).then((result) => {
                    this.$emit('EmitCallFunction');
                });
              })
              .catch(function(error) {
                // handle error
                console.log(error);
              });
          }
          //update comment
          axios
            .post("/api/workFlowTaskHistory", {
              id: guid(),
              task_id: item.task_id,
              way_flow_id:item.state_end_id,
              relation_workflow_id:item.id,
              action_by_id: this.user.employee_id,
              comment_task: this.txt
            })
            .then(
              response => {

              },
              error => {
                console.log(error);
              }
            );
          //update current_state
          axios
            .put("/api/workFlowTask/" + item.task_id, {
              current_state: item.state_end_id
            })
            .then(
              response => {
                this.getState();
                this.$emit('EmitCallFunction');
              },
              error => {
                console.log(error);
              }
            );
        }
      });
    }
  },
  watch: {
    state() {},
    request_id() {
      this.getState();
    }
  }
};
</script>

<style>
</style>