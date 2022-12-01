<template>
    <article
      class="follow"
    >     
          <h3>
           @{{ username }}
          </h3>
          <button
            v-if="!isFollowing() && !ownAccount()"
            @click="followUser"
          >
            ➕ Follow 
          </button>
  
          <button
            v-if="isFollowing() && !ownAccount()"
            @click="unfollowUser"
          >
            ➕ Unfollow
          </button>
  
      </section>
    </article>
  </template>

<template>
    <article class = "followButton">
        <h2>
            @{{ username }}
        </h2>
        <button
        v-if = "!isFollowing()"
        @click="followUser"
        >
        Follow
            
        </button>

        <button
        v-else
        @click="unfollowUser"
        >
        Unfollow
        </button>
    </article>
</template>
  
  <script>
  export default {
    name: 'FollowButtonComponent',
    props: {
      username: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        alerts: {} 
      };
    },
    methods: {
      followUser() {
        const params = {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          credentials: 'same-origin',
          body: JSON.stringify({username: this.username}), 
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully followed user!', status: 'success'
            });
            setTimeout(() => this.$delete(this.alerts, error), 3000);
          }
        };
        this.request(params);
        this.$store.commit('refreshFollows');
      },
      unfollowUser() {
        const params = {
          method: 'DELETE', 
          headers: {'Content-Type': 'application/json'},
          credentials: 'same-origin', 
          body: JSON.stringify({username: this.username}),
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully unfollowed user!', status: 'success'
            });
            setTimeout(() => this.$delete(this.alerts, error), 3000);
          }
        };
        this.request(params);
        this.$store.commit('refreshFollows');
      },
    
      async request(params) {
        const url = `/api/freets?followedUser=${username}`
        const options = {
          method: params.method, headers: {'Content-Type': 'application/json'}, body: params.body
        };
        try {
          const r = await fetch(url, options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
          this.$store.commit('refreshFollows');
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
    }
  };
  </script>
  